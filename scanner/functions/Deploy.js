function Deploy() {
    _classCallCheck(this, Deploy);

    var self = this;
    this.logger = new _coreLogger.Logger({
      'prefix': 'Ionic Deploy:'
    });
    this._plugin = false;
    this._isReady = false;
    this._channelTag = 'production';
    this._emitter = new _coreEvents.EventEmitter();
    this.logger.info("init");
    _coreCore.IonicPlatform.getMain().onReady(function () {
      self.initialize();
      self._isReady = true;
      self._emitter.emit('ionic_deploy:ready');
    });
  }