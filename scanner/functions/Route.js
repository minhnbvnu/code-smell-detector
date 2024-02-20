function Route(props) {
    var _this;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, Route);

    _this = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_getPrototypeOf___default()(Route).call(this, props));
    _this.dispose = void 0;
    _this.location = void 0;
    var history = __WEBPACK_IMPORTED_MODULE_6__navigator__["a" /* default */].history;
    _this.location = history.location;
    _this.dispose = history.listen(function () {
      if (!Object(__WEBPACK_IMPORTED_MODULE_7__utils__["c" /* locationIs */])(_this.location, history.location)) {
        _this.forceUpdate();
      }

      _this.location = history.location;
    });
    return _this;
  }