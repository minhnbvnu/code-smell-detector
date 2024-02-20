function Push(config) {
    _classCallCheck(this, Push);

    this.logger = new _coreLogger.Logger({
      'prefix': 'Ionic Push:'
    });

    var IonicApp = new _coreApp.App(settings.get('app_id'), settings.get('api_key'));
    IonicApp.devPush = settings.get('dev_push');
    IonicApp.gcmKey = settings.get('gcm_key');

    // Check for the required values to use this service
    if (!IonicApp.id || !IonicApp.apiKey) {
      this.logger.error('no app_id or api_key found. (http://docs.ionic.io/docs/io-install)');
      return false;
    } else if (_coreCore.IonicPlatform.isAndroidDevice() && !IonicApp.devPush && !IonicApp.gcmKey) {
      this.logger.error('GCM project number not found (http://docs.ionic.io/docs/push-android-setup)');
      return false;
    }

    this.app = IonicApp;
    this.registerCallback = false;
    this.notificationCallback = false;
    this.errorCallback = false;
    this._token = false;
    this._notification = false;
    this._debug = false;
    this._isReady = false;
    this._tokenReady = false;
    this._blockRegistration = false;
    this._blockSaveToken = false;
    this._registered = false;
    this._emitter = new _coreEvents.EventEmitter();
    this._plugin = null;
    if (config !== DEFER_INIT) {
      var self = this;
      _coreCore.IonicPlatform.getMain().onReady(function () {
        self.init(config);
      });
    }
  }