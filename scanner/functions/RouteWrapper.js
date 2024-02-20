function RouteWrapper() {
    var _getPrototypeOf2;

    var _this;

    __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck___default()(this, RouteWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn___default()(this, (_getPrototypeOf2 = __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_getPrototypeOf___default()(RouteWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      authPassed: AuthStatus.not,
      prevComponent: null
    };
    return _this;
  }