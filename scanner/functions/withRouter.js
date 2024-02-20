function withRouter(Custom) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    __WEBPACK_IMPORTED_MODULE_6__babel_runtime_helpers_inherits___default()(WithRouter, _Component);

    function WithRouter(props) {
      var _this;

      __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck___default()(this, WithRouter);

      _this = __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_getPrototypeOf___default()(WithRouter).call(this, props));
      _this.dispose = null;
      _this.asRoutePage = false;
      _this.location = void 0;

      if (props.match instanceof __WEBPACK_IMPORTED_MODULE_9__utils__["a" /* MatchResult */] && props.location) {
        _this.asRoutePage = true;
      } else {
        var history = __WEBPACK_IMPORTED_MODULE_10__navigator__["a" /* default */].history;
        _this.location = history.location;
        _this.dispose = history.listen(function () {
          if (!Object(__WEBPACK_IMPORTED_MODULE_9__utils__["c" /* locationIs */])(_this.location, history.location)) {
            _this.forceUpdate();
          }

          _this.location = history.location;
        });
      }

      return _this;
    }

    __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_createClass___default()(WithRouter, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.dispose) {
          this.dispose();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            wrappedComponentRef = _this$props.wrappedComponentRef,
            originProps = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectWithoutProperties___default()(_this$props, ["wrappedComponentRef"]);

        return this.asRoutePage ? Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(Custom, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, originProps, {
          ref: wrappedComponentRef
        })) : Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_8__route_context__["a" /* default */].Consumer, null, function (ctx) {
          var match = ctx.match,
              history = ctx.history,
              location = ctx.location;
          _this2.location = location;
          return Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(Custom, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({
            match: match,
            location: location,
            history: history
          }, originProps, {
            ref: wrappedComponentRef
          }));
        });
      }
    }]);

    return WithRouter;
  }(__WEBPACK_IMPORTED_MODULE_7_react__["Component"]), _class.displayName = "withRouter(".concat(Custom.displayName || Custom.name, ")"), _class.WrappedComponent = Custom, _temp;
}