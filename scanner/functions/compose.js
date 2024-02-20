function compose(renderFactory, ControllerType, routerView) {
  var lazyRender = null;

  if (!ControllerType) {
    ControllerType =
    /*#__PURE__*/
    function (_ViewController) {
      __WEBPACK_IMPORTED_MODULE_6__babel_runtime_helpers_inherits___default()(ControllerType, _ViewController);

      function ControllerType() {
        __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_classCallCheck___default()(this, ControllerType);

        return __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_getPrototypeOf___default()(ControllerType).apply(this, arguments));
      }

      return ControllerType;
    }(__WEBPACK_IMPORTED_MODULE_9__core_view_controller__["a" /* default */]);
  }

  var proto = ControllerType.prototype;
  Object(__WEBPACK_IMPORTED_MODULE_10__core_obx_utils__["m" /* invariant */])(proto instanceof __WEBPACK_IMPORTED_MODULE_9__core_view_controller__["a" /* default */], "Controller ".concat(ControllerType.name, " must be extends \"ViewController\""));

  if (routerView) {
    Object.defineProperty(proto, '$routerView', {
      configurable: false,
      enumerable: false,
      get: function get() {
        console.warn('$routerView is deprecated, use <RouterView /> instead.');
        return routerView(this);
      }
    });
  }

  Object.defineProperty(proto, '__routerView', {
    configurable: false,
    enumerable: false,
    value: function value(props) {
      return routerView ? routerView(this, props) : null;
    }
  });

  function createController(parent, props) {
    var _V = __WEBPACK_IMPORTED_MODULE_8__utils__["a" /* V */];

    if (!lazyRender) {
      var _ControllerType = ControllerType,
          components = _ControllerType.components;

      if (components) {
        _V = __WEBPACK_IMPORTED_MODULE_8__utils__["a" /* V */].wrapperWith(components);
      }

      lazyRender = renderFactory(_V);
    }

    var controller = new ControllerType(props);
    controller.$parent = parent;
    controller.$prerendering = __WEBPACK_IMPORTED_MODULE_14__prerendering__["a" /* prerendering */];
    controller.__vxHelpers = ControllerType.helpers;
    controller.__V = _V;
    return controller;
  }

  function compileRequest(props, state) {
    var controller = state.controller;

    var match = props.match,
        location = props.location,
        parentController = props.parentController,
        defined = props.defined,
        extras = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_objectWithoutProperties___default()(props, ["match", "location", "parentController", "defined"]);

    if (match instanceof __WEBPACK_IMPORTED_MODULE_11__router_utils__["a" /* MatchResult */]) {
      var loc = __WEBPACK_IMPORTED_MODULE_12__navigator__["a" /* default */].history.location;

      var _uri = loc.pathname + loc.search;

      if (!controller || state.uri !== _uri || !Object(__WEBPACK_IMPORTED_MODULE_13__core_utils__["a" /* shallowEqual */])(state.state, loc.state) || !Object(__WEBPACK_IMPORTED_MODULE_13__core_utils__["a" /* shallowEqual */])(state.extras, extras)) {
        var nextState = {
          uri: _uri,
          defined: defined,
          state: loc.state,
          extras: extras
        };

        var request = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, ControllerType.defaultProps, nextState, {
          path: loc.pathname,
          params: match.params,
          query: parseQuery(loc.search)
        });

        if (!controller) {
          controller = createController(parentController, request);
          controller.$enter(true, request);
          nextState.controller = controller;
        } else {
          controller.$props = request;
          controller.$enter(false, request);
        }

        return nextState;
      }
    } else if (!controller) {
      var _params = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, ControllerType.defaultProps, extras);

      controller = createController(parentController, _params);
      controller.$enter(true, _params);
      return {
        controller: controller
      };
    } else {
      var _params2 = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, ControllerType.defaultProps, extras);

      controller.$props = _params2;
      controller.$enter(false, _params2);
    }

    return null;
  }

  var View =
  /*#__PURE__*/
  function (_Component) {
    __WEBPACK_IMPORTED_MODULE_6__babel_runtime_helpers_inherits___default()(View, _Component);

    function View() {
      var _getPrototypeOf2;

      var _this;

      __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_classCallCheck___default()(this, View);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default()(this, (_getPrototypeOf2 = __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_getPrototypeOf___default()(View)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.state = {};
      return _this;
    }

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_createClass___default()(View, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.state.controller) {
          this.state.controller.$destroy();
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate() {
        return false;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.state.controller) {
          this.state.controller.$didMount();
        }

        if (this.props.match && this.props.match.isExact) {
          document.dispatchEvent(new Event('render-event'));
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.state.controller) {
          return null;
        }

        return lazyRender(this.state.controller);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        return compileRequest(props, state);
      }
    }]);

    return View;
  }(__WEBPACK_IMPORTED_MODULE_7_react__["Component"]);

  View.displayName = ControllerType.name || 'View';
  return View;
}