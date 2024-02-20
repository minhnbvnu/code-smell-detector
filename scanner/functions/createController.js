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