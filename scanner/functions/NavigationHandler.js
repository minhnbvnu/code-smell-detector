function NavigationHandler(body, canvas) {
      var _this = this;

      _classCallCheck(this, NavigationHandler);

      this.body = body;
      this.canvas = canvas;

      this.iconsCreated = false;
      this.navigationHammers = [];
      this.boundFunctions = {};
      this.touchTime = 0;
      this.activated = false;

      this.body.emitter.on('activate', function () {
        _this.activated = true;_this.configureKeyboardBindings();
      });
      this.body.emitter.on('deactivate', function () {
        _this.activated = false;_this.configureKeyboardBindings();
      });
      this.body.emitter.on('destroy', function () {
        if (_this.keycharm !== undefined) {
          _this.keycharm.destroy();
        }
      });

      this.options = {};
    }