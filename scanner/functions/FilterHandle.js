function FilterHandle(group, extraInfo) {
    _classCallCheck(this, FilterHandle);

    this._eventRelay = new _events2.default();
    this._emitter = new util.SubscriptionTracker(this._eventRelay);

    // Name of the group we're currently tracking, if any. Can change over time.
    this._group = null;
    // The filterSet that we're tracking, if any. Can change over time.
    this._filterSet = null;
    // The Var we're currently tracking, if any. Can change over time.
    this._filterVar = null;
    // The event handler subscription we currently have on var.on("change").
    this._varOnChangeSub = null;

    this._extraInfo = util.extend({ sender: this }, extraInfo);

    this._id = "filter" + nextId();

    this.setGroup(group);
  }