function SelectionHandle() {
    var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var extraInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, SelectionHandle);

    this._eventRelay = new _events2.default();
    this._emitter = new util.SubscriptionTracker(this._eventRelay);

    // Name of the group we're currently tracking, if any. Can change over time.
    this._group = null;
    // The Var we're currently tracking, if any. Can change over time.
    this._var = null;
    // The event handler subscription we currently have on var.on("change").
    this._varOnChangeSub = null;

    this._extraInfo = util.extend({ sender: this }, extraInfo);

    this.setGroup(group);
  }