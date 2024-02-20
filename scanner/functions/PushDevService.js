function PushDevService() {
    _classCallCheck(this, PushDevService);

    this.logger = new _coreLogger.Logger({
      'prefix': 'Ionic Push (dev):'
    });
    this._serviceHost = settings.getURL('platform-api') + '/push';
    this._token = false;
    this._watch = false;
  }