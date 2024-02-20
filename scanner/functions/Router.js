function Router(props) {
    var _this;

    __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck___default()(this, Router);

    _this = __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_getPrototypeOf___default()(Router).call(this, props));
    _this.dispose = void 0;
    _this.contextMap = {};
    _this.location = void 0;
    var history = __WEBPACK_IMPORTED_MODULE_8__navigator__["a" /* default */].history;
    _this.location = history.location;
    _this.dispose = history.listen(function () {
      if (!Object(__WEBPACK_IMPORTED_MODULE_9__utils__["c" /* locationIs */])(_this.location, history.location)) {
        _this.forceUpdate();
      }

      _this.location = history.location;
    });
    return _this;
  }