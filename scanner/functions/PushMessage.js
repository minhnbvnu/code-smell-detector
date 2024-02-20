function PushMessage(raw) {
    _classCallCheck(this, PushMessage);

    this._raw = raw || {};

    if (!this._raw.additionalData) {
      // this should only hit if we are serving up a development push
      this._raw.additionalData = {
        'coldstart': false,
        'foreground': true
      };
    }

    this._payload = null;
    this.app = null;
    this.text = null;
    this.title = null;
    this.count = null;
    this.sound = null;
    this.image = null;
  }