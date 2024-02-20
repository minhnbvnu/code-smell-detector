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