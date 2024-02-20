function Channel() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        transport = _ref.transport,
        _ref$async = _ref.async,
        async = _ref$async === void 0 ? false : _ref$async;

    _classCallCheck(this, Channel);

    this.isAsync = void 0;
    this.sender = generateRandomId();
    this.events = {};
    this.data = {};
    this.transport = undefined;
    this.addPeerListener = util_deprecate__WEBPACK_IMPORTED_MODULE_8___default()(function (eventName, listener) {
      _this.addListener(eventName, listener);
    }, Object(ts_dedent__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      channel.addPeerListener is deprecated\n    "]))));
    this.isAsync = async;

    if (transport) {
      this.transport = transport;
      this.transport.setHandler(function (event) {
        return _this.handleEvent(event);
      });
    }
  }