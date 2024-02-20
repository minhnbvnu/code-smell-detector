function Forward() {
    classCallCheck_default()(this, Forward);
    this._lastRequestId = null;
    this._disabled = enums["b" /* Enabled */].YES;
    this._config = {};
    this._originRequest = new Map();
    this._originRequestHeaders = new Map();
    this._urls = new Array(200); // for cache
  }