function Demo(opts1, callback) {
      var cameraOpts, clearColor, clearOpacity, doFullScreen, focusDist, image, key, mathboxOpts, onPreloaded, preload, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, scaleUI, toPreload, value;
      this.opts = opts1;
      this.stopAll = bind(this.stopAll, this);
      this.animate = bind(this.animate, this);
      this.clearAnims = bind(this.clearAnims, this);
      this.texCombo = bind(this.texCombo, this);
      this.texSet = bind(this.texSet, this);
      this.urlParams = urlParams;
      if (this.opts == null) {
        this.opts = {};
      }
      mathboxOpts = {
        plugins: ['core', 'controls', 'cursor'],
        controls: {
          klass: OrbitControls,
          parameters: {
            noKeys: true
          }
        },
        mathbox: {
          inspect: false
        },
        splash: {
          fancy: true,
          color: "blue"
        }
      };
      extend(mathboxOpts, (ref = this.opts.mathbox) != null ? ref : {});
      clearColor = (ref1 = this.opts.clearColor) != null ? ref1 : 0xffffff;
      clearOpacity = (ref2 = this.opts.clearOpacity) != null ? ref2 : 1.0;
      cameraOpts = {
        proxy: true,
        position: [3, 1.5, 1.5],
        lookAt: [0, 0, 0],
        up: [0, 0, 1]
      };
      extend(cameraOpts, (ref3 = this.opts.camera) != null ? ref3 : {});
      if ((ref4 = this.opts.cameraPosFromQS) != null ? ref4 : true) {
        cameraOpts.position = this.urlParams.get('camera', 'float[]', cameraOpts.position);
      }
      focusDist = (ref5 = this.opts.focusDist) != null ? ref5 : 1.5;
      scaleUI = (ref6 = this.opts.scaleUI) != null ? ref6 : true;
      doFullScreen = (ref7 = this.opts.fullscreen) != null ? ref7 : true;
      this.dims = (ref8 = this.opts.dims) != null ? ref8 : 3;
      clearColor = new Color(clearColor);
      this.animations = [];
      onPreloaded = (function(_this) {
        return function() {
          var ref9;
          _this.mathbox = mathBox(mathboxOpts);
          _this.three = _this.mathbox.three;
          _this.three.renderer.setClearColor(clearColor.three(), clearOpacity);
          _this.controls = _this.three.controls;
          _this.camera = _this.mathbox.camera(cameraOpts)[0].controller.camera;
          if ((ref9 = _this.controls) != null) {
            if (typeof ref9.updateCamera === "function") {
              ref9.updateCamera();
            }
          }
          _this.canvas = _this.mathbox._context.canvas;
          if (scaleUI) {
            _this.mathbox.bind('focus', function() {
              return focusDist / 1000 * Math.min(_this.canvas.clientWidth, _this.canvas.clientHeight);
            });
          } else {
            _this.mathbox.set('focus', focusDist);
          }
          if (doFullScreen) {
            document.body.addEventListener('keypress', function(event) {
              if (event.charCode === 'f'.charCodeAt(0 && screenfull.enabled)) {
                return screenfull.toggle();
              }
            });
          }
          return callback.apply(_this);
        };
      })(this);
      preload = (ref9 = this.opts.preload) != null ? ref9 : {};
      toPreload = 0;
      if (preload) {
        for (key in preload) {
          value = preload[key];
          toPreload++;
          image = new Image();
          this[key] = image;
          image.src = value;
          image.addEventListener('load', function() {
            if (--toPreload === 0) {
              return onPreloaded();
            }
          });
        }
      }
      if (!(toPreload > 0)) {
        onPreloaded();
      }
    }