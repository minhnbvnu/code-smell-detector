function createRouter(config, pagesMap, hooks, page) {
  if (hooks) {
    if (typeof hooks === 'function') {
      // TODO support thenable return
      config = hooks(config) || config;
    } else {
      config = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, config, hooks);
    }
  }

  var _config = config,
      _config$exact = _config.exact,
      exact = _config$exact === void 0 ? false : _config$exact,
      baseDir = _config.baseDir,
      beforeRoute = _config.beforeRoute;
  var normalizedRoutes = null;
  var normalized = false;

  function getRoutes() {
    if (normalized) {
      return normalizedRoutes;
    }

    normalized = true;

    if (!config.routes) {
      return normalizedRoutes;
    }

    var patchedBeforeRoute = patchBeforeRoute(beforeRoute); // normalize routes

    normalizedRoutes = config.routes.map(function (route) {
      var ret = {
        defined: route,
        path: route.path,
        exact: route.exact != null ? route.exact : exact
      };

      if (route.children) {
        ret.children = route.children;
        return ret;
      }

      if (route.redirect) {
        ret.children = function (_ref2) {
          var match = _ref2.match;
          return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_8__redirect__["a" /* default */], {
            computedMatch: match,
            to: route.redirect
          });
        };

        return ret;
      }

      var Component;

      if (route.main) {
        var key = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* resolve */])(route.main, baseDir);
        Component = pagesMap[key];
      } else {
        Component = function Component() {
          return null;
        };
      }

      if (!patchedBeforeRoute) {
        ret.children = function (props) {
          return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(Component, props);
        };
      } else {
        ret.children = function (props) {
          return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_6__route_wrapper__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, props, {
            beforeRoute: patchedBeforeRoute,
            Component: Component
          }));
        };
      }

      return ret;
    }).filter(Boolean);
    return normalizedRoutes;
  }

  function factory(parentController, props) {
    var routes = getRoutes();
    return routes ? Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_7__router__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({}, props, {
      parentController: parentController,
      routes: routes,
      fixed: true
    })) : null;
  }

  if (page) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__compose__["a" /* default */])(function ViewFactory() {
      return function (controller) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* X */])(controller.__m({
          key: 'main'
        }), function (_ref3) {
          var scope = _ref3.scope;
          return scope.__routerView();
        });
      };
    }, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof___default()(page) === 'object' ? page : undefined, factory);
  }

  return factory;
}