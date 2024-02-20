function proportionalResize(image, frame, toWidth, editorWidth) {
      var $frame = jQuery(frame);
      var $image = jQuery(image);
      var $caption = $frame.parent().find('div.caption_small');
      var transformData = $image.attr('transform-data');
      var rightMarginBetweenImages = 6;

      // get current image template
      var currentLayout = getImageLayout(frame);

      // sync caption width with frame
      if (currentLayout === 'image-layout-1image_1caption_bottom') {
        if ($caption.length) {
          $caption.width($frame.width());
        }
      }
      else if (
        currentLayout === 'image-layout-1image_1caption_left' ||
        currentLayout === 'image-layout-1image_1caption_right'
      ) {
        if ($caption.length) {
          $caption.width(
            toWidth - parseInt($frame.width()) - 20
          );
        }
      }
      else if (
        currentLayout === 'image-layout-2images_1caption_bottom' &&
        $frame.next().hasClass('caption_wrapper')
      ) {
        $caption.width(
          $frame.prev().width() + $frame.width() + rightMarginBetweenImages
        );
      }

      // if image was not edited
      if (_.isUndefined(transformData)) {

        // image is not rendered yet
        if ($image.width() === 0 || $image.width() === null) return;

        var _editor = new BkImageEditor(
          $image[0],
          $frame[0],
          editorWidth
        );
        _editor._init();
        _editor._addPermanentProperties();
        _editor._transformImage();
        _editor._transformFrame();

        transformData = $image.attr('transform-data');
      }

      transformData = JSON.parse(transformData);
      var quotient = transformData['editorWidth'] / toWidth;

      // there is no changes
      if (quotient === 1) return;

      //////////////////////////////
      // make proportional resize //
      //////////////////////////////

      // current frame/image sizes defined in css
      var frameWidth = parseFloat($frame[0].style['width']);
      var frameHeight = parseFloat($frame[0].style['height']);
      var imageWidth = parseFloat($image[0].style['width']);
      var imageHeight = parseFloat($image[0].style['height']);

      if (!frameWidth) frameWidth = parseFloat($frame.width());
      if (!frameHeight) frameHeight = parseFloat($frame.height());
      if (!imageWidth) imageWidth = parseFloat($image.width());
      if (!imageHeight) imageHeight = parseFloat($image.height());

      if (frameWidth == 0 || frameHeight == 0 || imageWidth == 0 || imageHeight == 0) return;

      var scaledFrameWidth = frameWidth / quotient;
      var scaledFrameHeight = frameHeight / quotient;
      var scaledImageWidth = imageWidth / quotient;
      var scaledImageHeight = imageHeight / quotient;

      // apply new css width/height to image and frame
      $frame.css('width', scaledFrameWidth);
      $frame.css('height', scaledFrameHeight);
      $image.css('width', scaledImageWidth);
      $image.css('height', scaledImageHeight);

      // // apply new css width for image caption if it exists
      if (currentLayout === 'image-layout-1image_1caption_bottom') {
        if ($caption.length) {
          $caption.width(scaledFrameWidth);
        }
      }
      else if (
        currentLayout === 'image-layout-1image_1caption_left' ||
        currentLayout === 'image-layout-1image_1caption_right'
      ) {
        if ($caption.length) {
          $caption.width(
            toWidth - parseInt(scaledFrameWidth) - 20
          );
        }
      }
      else if (
        currentLayout === 'image-layout-2images_1caption_bottom' &&
        $frame.next().hasClass('caption_wrapper')
      ) {
        $caption.width(
          $frame.prev().width() + scaledFrameWidth + rightMarginBetweenImages
        );
      }
      else if (
        currentLayout === 'image-layout-2images_2captions_bottom'
      ) {
        $caption.width(
          $frame.prev().width() + scaledFrameWidth
        );
      }

      // image transform css
      var transformCss = $image[0].style[Modernizr.prefixed('transform')];
      var imageTranslateX = 0;
      var imageTranslateY = 0;

      if (transformCss.search(/translate\(/i) !== -1) {
        var _translate = transformCss.split('translate(')[1].split(')')[0].split(',');

        imageTranslateX = parseFloat(_translate[0]);
        imageTranslateY = parseFloat(_translate[1]);
      }

      var imageScaledTranslateX = imageTranslateX / quotient;
      var imageScaledTranslateY = imageTranslateY / quotient;

      // apply new translate css to image
      $image[0].style[Modernizr.prefixed('transform')] = transformCss.replace(
        'translate(' + imageTranslateX + 'px, ' + imageTranslateY + 'px)',
        'translate(' + imageScaledTranslateX + 'px, ' + imageScaledTranslateY + 'px)'
      );

      // update transform-data
      transformData['editorWidth'] = editorWidth;
      transformData['imageWidth'] = scaledImageWidth;
      transformData['imageHeight'] = scaledImageHeight;
      transformData['imageTranslateX'] = imageScaledTranslateX;
      transformData['imageTranslateY'] = imageScaledTranslateY;
      transformData['frameWidth'] = scaledFrameWidth;
      transformData['frameHeight'] = scaledFrameHeight;

      // record updated transform-data
      $image.attr('transform-data', JSON.stringify(transformData));
    }