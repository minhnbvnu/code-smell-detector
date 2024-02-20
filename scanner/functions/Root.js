function Root(props) {
    var _this;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, Root);

    _this = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_getPrototypeOf___default()(Root).call(this, props));
    _this.dispose = void 0;
    _this.rootContext = void 0;
    _this.location = void 0;
    var history = __WEBPACK_IMPORTED_MODULE_6__navigator__["a" /* default */].history;
    _this.location = history.location;
    _this.rootContext = new __WEBPACK_IMPORTED_MODULE_8__route_context__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_7__utils__["a" /* MatchResult */]('/', '/', _this.location.pathname === '/'));
    _this.dispose = history.listen(function () {
      var location = history.location;

      if (!Object(__WEBPACK_IMPORTED_MODULE_7__utils__["c" /* locationIs */])(_this.location, location)) {
        _this.rootContext.setMatch(new __WEBPACK_IMPORTED_MODULE_7__utils__["a" /* MatchResult */]('/', '/', location.pathname === '/'));

        _this.forceUpdate();
      }

      _this.location = location;
    });
    return _this;
  }