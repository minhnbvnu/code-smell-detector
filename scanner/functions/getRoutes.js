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