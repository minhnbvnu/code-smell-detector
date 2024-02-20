function SubscriptionTracker(emitter) {
    _classCallCheck(this, SubscriptionTracker);

    this._emitter = emitter;
    this._subs = {};
  }