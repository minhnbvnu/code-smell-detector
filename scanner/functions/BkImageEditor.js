function BkImageEditor(image, frame, editorWidth) {
      /**
       BkImageEditor object.
       Use .start()/.stop() methods for controll editor.
       :Args:
       - image (:class:`object`): Image js object
       - frame (:class:`object`): Image frame js object
       */

      var imEd = this;

      // image editor current state
      // available options: ['stopped', 'started']
      imEd.state = 'stopped';

      // editor width
      imEd.editorWidth = editorWidth;

      // js instances
      imEd.image = image;
      imEd.frame = frame;

      // jquery instances
      imEd.$image = jQuery(image);
      imEd.$frame = jQuery(frame);

      // interact js instances
      imEd.interactImage = null;
      imEd.interactFrame = null;

      // image properties
      imEd.imageRawWidth = null;
      imEd.imageRawHeight = null;
      imEd.imageWidth = null;
      imEd.imageHeight = null;
      imEd.imageTranslateX = null;
      imEd.imageTranslateY = null;
      imEd.imageScaleX = null;
      imEd.imageScaleY = null;
      imEd.imageRotateDegree = null;
      imEd.imageContrast = null;
      imEd.imageBrightness = null;
      imEd.imageBlur = null;
      imEd.imageSaturate = null;
      imEd.imageOpacity = null;

      // frame properties
      imEd.frameWidth = null;
      imEd.frameHeight = null;
      imEd.frameFPI = false;

      // settings
      imEd.DEBUG = false;
      imEd.IMAGE_MIN_WIDTH = 100;
      imEd.IMAGE_MIN_HEIGHT = 100;
      imEd.FRAME_MAX_WIDTH = editorWidth;
      imEd.FRAME_MAX_HEIGHT = 1000;
      imEd.FRAME_MIN_WIDTH = 50;
      imEd.FRAME_MIN_HEIGHT = 50;

      /////////////////////////
      // shortcuts & helpers //
      /////////////////////////
      var log = function (message) {
        if (imEd.DEBUG) {
          console.info('BkImageEditor |', message);
        }
      };

      var imageEditorException = function (message) {
        this.name = "imageEditorException";
        this.message = message;
      };
      imageEditorException.prototype = Error.prototype;


      ////////////////////
      // public methods //
      ////////////////////
      this.start = function () {
        /**
         Start image editing.
         */

        if (imEd.state === 'started') {
          throw new imageEditorException('Editing already started');
        }
        imEd.state = 'started';

        log('start');

        imEd._init();
        imEd._loadRawImageDimensions(imEd.$image.attr('src'));
        imEd._addTempProperties();
        imEd._addPermanentProperties();
        imEd._transformImage();
        imEd._transformFrame();

        // send start notification
        imEd._sendStartNotification();

        // image
        imEd.interactImage = interact(imEd.image).draggable({
          inertia: true,
          onmove: imEd._interactDraggableListener,
          restrict: {
            restriction: "parent",
            endOnly: true
          }
        }).on('dragstart', function (event) {
          log('interactImage drastart');
        }).on('dragend', function (event) {
          log('interactImage dragend');
          imEd._recordTransformData();
        });

        // frame
        imEd.interactFrame = interact(imEd.frame).resizable({
          // left true? and resize right during this event
          edges: {left: false, right: true, bottom: true, top: false},
          snap: {
            targets: [
              interact.createSnapGrid({x: 1, y: 1})
            ]
          }
        }).on('resizestart', function (event) {

          log('interactFrame resizestart');

        }).on('resizemove', function (event) {

          imEd._interactResizableListener(event);

          // display image size
          //tailImageSize(parseInt($this.wrapper.style.width), parseInt($this.wrapper.style.height));

          // send signal
          PubSub.pub('bk-image-editor.frame.changed', {
            'x': imEd.frame.style.width,
            'y': imEd.frame.style.height
          });

        }).on('resizeend', function (event) {
          log('interactFrame resizeend');
          imEd._recordTransformData();
        });

      };

      this.stop = function () {
        /**
         Stop image editing.
         */

        if (imEd.state === 'stopped') {
          throw new imageEditorException('Editing already stopped');
        }
        imEd.state = 'stopped';

        log('stop');

        imEd._removeTempProperties();
        imEd._recordTransformData();

        imEd.interactFrame.resizable(false);
        imEd.interactImage.draggable(false);
      };

      this.imageActions = {
        flipVertical: function () {
          log('imageActions flipVertical');

          if (imEd._imageIsVertical()) {
            imEd.imageScaleX *= (-1);
          } else {
            imEd.imageScaleY *= (-1);
          }

          imEd._transformImage();
          imEd._recordTransformData();
        },

        flipHorizontal: function () {
          log('imageActions flipHorizontal');

          if (imEd._imageIsVertical()) {
            imEd.imageScaleY *= (-1);
          } else {
            imEd.imageScaleX *= (-1);
          }

          imEd._transformImage();
          imEd._recordTransformData();
        },

        rotateLeft: function () {
          log('imageActions rotateLeft');
          imEd._rotateImageWithAnimation(-90);
        },

        rotateRight: function () {
          log('imageActions rotateRight');
          imEd._rotateImageWithAnimation(90);
        },

        toggleFPI: function () {
          log('imageActions toggleFPI');
          imEd.frameFPI = !imEd.frameFPI;
          imEd._recordTransformData();
        },

        zoom: function (value) {
          log('imageActions zoom: ' + value);

          var oldImageWidth = imEd.imageWidth;
          var oldImageHeight = imEd.imageHeight;
          var newImageWidth = imEd.imageRawWidth + imEd.imageRawWidth/100 * value;
          var newImageHeight = imEd.imageRawHeight + imEd.imageRawHeight/100 * value;

          // zoom %
          if ( newImageWidth < imEd.IMAGE_MIN_WIDTH || newImageHeight < imEd.IMAGE_MIN_HEIGHT ) {
            log('imageActions zoom: size LIMIT');
            return;
          }
          imEd.imageWidth = newImageWidth;
          imEd.imageHeight = newImageHeight;

          var imageWidthDelta = imEd.imageWidth - oldImageWidth;
          var imageHeightDelta = imEd.imageHeight - oldImageHeight;

          if (imEd._imageIsVertical()) {
            imageWidthDelta = [imageHeightDelta, imageHeightDelta = imageWidthDelta][0];
          }

          imEd.imageTranslateX -= imageWidthDelta / 2;
          imEd.imageTranslateY -= imageHeightDelta / 2;

          imEd._transformImage();
          imEd._recordTransformData();

        },

        contrast: function (value) {
          log('imageActions contrast: ' + value);

          imEd.imageContrast = value;
          imEd._transformImage();
          imEd._recordTransformData();
        },

        brightness: function (value) {
          log('imageActions brightness: ' + value);

          imEd.imageBrightness = value;
          imEd._transformImage();
          imEd._recordTransformData();
        },

        blur: function (value) {
          log('imageActions blur: ' + value);

          imEd.imageBlur = value/100;
          imEd._transformImage();
          imEd._recordTransformData();
        },

        saturate: function (value) {
          log('imageActions saturate: ' + value);

          imEd.imageSaturate = value;
          imEd._transformImage();
          imEd._recordTransformData();
        },

        opacity: function (value) {
          log('imageActions opacity: ' + value);

          imEd.imageOpacity = value;
          imEd._transformImage();
          imEd._recordTransformData();
        }
      };


      /////////////////////
      // private methods //
      /////////////////////
      this._init = function () {

        log('_init');

        // anyway we load default data
        imEd.imageWidth = imEd.$image.width();
        imEd.imageHeight = imEd.$image.height();
        imEd.imageTranslateX = 0;
        imEd.imageTranslateY = 0;
        imEd.imageScaleX = 1;
        imEd.imageScaleY = 1;
        imEd.imageRotateDegree = 0;
        imEd.imageContrast = 100;
        imEd.imageBrightness = 100;
        imEd.imageBlur = 0;
        imEd.imageSaturate = 100;
        imEd.imageOpacity = 100;
        imEd.frameWidth = imEd.imageWidth;
        imEd.frameHeight = imEd.imageHeight;

        // override default data
        var transformData = imEd.$image.attr('transform-data');

        if (transformData && !_.isUndefined(transformData)) {
          transformData = JSON.parse(transformData);

          log('_init override default data'); log(transformData);

          _.each(transformData, function (val, key) {
            imEd[key] = val;
          });
        }

        imEd._recordTransformData();
      };

      this._sendStartNotification = function () {
        if (!imEd.imageRawWidth) {
          setTimeout(imEd._sendStartNotification, 20);
        } else {
          PubSub.pub('bk-image-editor.initialized', {
            'imageEditor': imEd
          });
        }
      };

      this._getTransformData = function () {
        return {
          // image
          imageWidth: imEd.imageWidth,
          imageHeight: imEd.imageHeight,
          imageTranslateX: imEd.imageTranslateX,
          imageTranslateY: imEd.imageTranslateY,
          imageScaleX: imEd.imageScaleX,
          imageScaleY: imEd.imageScaleY,
          imageRotateDegree: imEd.imageRotateDegree,
          imageContrast: imEd.imageContrast,
          imageBrightness: imEd.imageBrightness,
          imageBlur: imEd.imageBlur,
          imageSaturate: imEd.imageSaturate,
          imageOpacity: imEd.imageOpacity,
          // frame
          frameWidth: imEd.frameWidth,
          frameHeight: imEd.frameHeight,
          frameFPI: imEd.frameFPI,
          // editor
          editorWidth: imEd.editorWidth
        }
      };

      this._recordTransformData = function () {
        /**
         Record data required by server side renderer.
         */
        var data = imEd._getTransformData();
        imEd.image.setAttribute('transform-data',
                                JSON.stringify(data)
        );

        log('_recordTransformData'); log(data);

        // send notification that transformed data was updated
        // useful for enabling save button
        PubSub.pub('bk-image-editor.transform-data.updated', {
          'data': data
        });

      };

      this._transformImage = function () {
        imEd.image.style.width = imEd.imageWidth + 'px';
        imEd.image.style.height = imEd.imageHeight + 'px';

        imEd.image.style[Modernizr.prefixed('transform')] =
          'translate(' + imEd.imageTranslateX + 'px, ' + imEd.imageTranslateY + 'px) ' +
          'rotate(' + imEd.imageRotateDegree + 'deg) ' +
          'scaleX(' + imEd.imageScaleX + ') ' +
          'scaley(' + imEd.imageScaleY + ')';

        // Modernizr.prefixed('filter') fails
        // looks like bug is in chromium https://github.com/Modernizr/Modernizr/issues/981

        _.each(['-webkit-filter', '-o-filter', '-moz-filter', '-ms-filter', 'filter'], function (filterKey) {
          imEd.image.style[filterKey] =
            'contrast(' + imEd.imageContrast + '%) ' +
            'brightness(' + imEd.imageBrightness + '%) ' +
            'blur(' + imEd.imageBlur + 'px) ' +
            'opacity(' + imEd.imageOpacity + '%) ' +
            'saturate(' + imEd.imageSaturate + '%) ';
        });
      };

      this._transformFrame = function () {
        imEd.frame.style.width = imEd.frameWidth + 'px';
        imEd.frame.style.height = imEd.frameHeight + 'px';
      };

      this._addPermanentProperties = function () {
        imEd.$frame.addClass('bk-image-editor');
      };

      this._addTempProperties = function () {
        imEd.$image.addClass('bk-image-editor-image');
        imEd.$frame.addClass('bk-image-editor-frame');
      };

      this._removeTempProperties = function () {
        imEd.$image.removeClass('bk-image-editor-image');
        imEd.$frame.removeClass('bk-image-editor-frame');
      };

      this._loadRawImageDimensions = function (source) {
        var tempImg = new Image();

        tempImg.onload = function () {
          log('_loadRawImageDimensions ' + tempImg.width + 'X' + tempImg.height);
          imEd.imageRawWidth = tempImg.width;
          imEd.imageRawHeight = tempImg.height;
        };

        tempImg.src = source;
      };

      this._interactDraggableListener = function (event) {
        imEd.imageTranslateX += event.dx;
        imEd.imageTranslateY += event.dy;
        imEd._transformImage();
      };

      this._interactResizableListener = function (event) {

        var isXpermitted = true;
        var isYpermitted = true;

        // limit width X
        if (event.edges.right === true) {
          if (imEd.FRAME_MAX_WIDTH && event.rect.width >= imEd.FRAME_MAX_WIDTH) {
            // if we want to decrease size
            if (event.rect.width >= imEd.frameWidth) {
              isXpermitted = false;
            }
          }
          if (imEd.FRAME_MIN_WIDTH && event.rect.width < imEd.FRAME_MIN_WIDTH) {
            // if we want to increase size
            if (event.rect.width < imEd.frameWidth) {
              isXpermitted = false;
            }
          }
        }
        // limit height
        if (event.edges.bottom === true) {
          if (imEd.FRAME_MAX_HEIGHT && event.rect.height >= imEd.FRAME_MAX_HEIGHT) {
            // if we want to decrease size
            if (event.rect.height >= imEd.frameHeight) {
              isYpermitted = false;
            }
          }
          if (imEd.FRAME_MIN_HEIGHT && event.rect.height < imEd.FRAME_MIN_HEIGHT) {
            // if we want to increase size
            if (event.rect.height < imEd.frameHeight) {
               isYpermitted = false;
            }
          }
        }

        // move right (X)
        if (event.edges.right === true && event.edges.top === false && event.edges.bottom === false) {
          if (isXpermitted) {
            imEd.frameWidth = event.rect.width;
          }
        }
        // move bottom (Y)
        else if (event.edges.left === false && event.edges.right === false && event.edges.bottom === true) {
          if (isYpermitted) {
            imEd.frameHeight = event.rect.height;
          }
        }
        // move right-bottom corner (X && Y)
        else if (event.edges.right === true && event.edges.bottom === true) {
          if (isXpermitted) {
            imEd.frameWidth = event.rect.width;
          }
          if (isYpermitted) {
            imEd.frameHeight = event.rect.height;
          }
        }

        imEd._transformFrame();

      };

      this._imageIsVertical = function () {
        return (Math.abs(imEd.imageRotateDegree) === 90 || Math.abs(imEd.imageRotateDegree) === 270);
      };

      this._rotateImageWithAnimation = function (degree) {
        var degreeTurned = 0;
        var degreeStep = 5;
        var rotateSpeed = 10;

        if (degree < 0) {
          degreeStep = -5;
        }

        function rotateDegree(deg) {
          degreeTurned += deg;
          imEd.imageRotateDegree += deg;

          if (imEd.imageRotateDegree === 360 || imEd.imageRotateDegree === -360) {
            imEd.imageRotateDegree = 0;
          }

          imEd._transformImage();

          if (degreeTurned === degree) {
            imEd._transformImage();
            imEd._recordTransformData();
          } else {
            setTimeout(rotateDegree, rotateSpeed, degreeStep);
          }

        }

        rotateDegree(degreeStep);
      }

    }