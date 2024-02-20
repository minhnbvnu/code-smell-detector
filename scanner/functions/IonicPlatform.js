function IonicPlatform() {
    _classCallCheck(this, IonicPlatform);

    var self = this;
    this.logger = new _logger.Logger({
      'prefix': 'Ionic Core:'
    });
    this.logger.info('init');
    this._pluginsReady = false;
    this.emitter = IonicPlatform.getEmitter();
    this._bootstrap();

    if (self.cordovaPlatformUnknown) {
      self.logger.info('attempting to mock plugins');
      self._pluginsReady = true;
      self.emitter.emit('ionic_core:plugins_ready');
    } else {
      try {
        document.addEventListener("deviceready", function () {
          self.logger.info('plugins are ready');
          self._pluginsReady = true;
          self.emitter.emit('ionic_core:plugins_ready');
        }, false);
      } catch (e) {
        self.logger.info('unable to listen for cordova plugins to be ready');
      }
    }
  }