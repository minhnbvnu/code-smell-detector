function Analytics(config) {
    _classCallCheck(this, Analytics);

    this._dispatcher = null;
    this._dispatchIntervalTime = 30;
    this._useEventCaching = true;
    this._serviceHost = settings.getURL('analytics');

    this.logger = new _coreLogger.Logger({
      'prefix': 'Ionic Analytics:'
    });

    this.logger._silence = true;

    this.storage = _coreCore.IonicPlatform.getStorage();
    this.cache = new _storage.BucketStorage('ionic_analytics');
    this._addGlobalPropertyDefaults();
    if (config !== DEFER_REGISTER) {
      this.register(config);
    }
  }