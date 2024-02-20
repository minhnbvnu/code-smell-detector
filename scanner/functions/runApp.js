function runApp(AppComponent) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // init history
  __WEBPACK_IMPORTED_MODULE_10__navigator__["a" /* default */].init(config.history);

  if (config.globalComponents) {
    register(globalMaps, config.globalComponents);
  }

  if (config.globalHelpers) {
    Object(__WEBPACK_IMPORTED_MODULE_4__core_obx_utils__["t" /* objectAssign */])(globalHelpers, config.globalHelpers);
  }

  var containerId = config.containerId || 'app';
  var container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
    container.id = containerId;
  }

  Object(__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"])(Object(__WEBPACK_IMPORTED_MODULE_3_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_11__router_root__["a" /* default */], null, function (props) {
    return Object(__WEBPACK_IMPORTED_MODULE_3_react__["createElement"])(AppComponent, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, props, {
      key: 'appRoot'
    }));
  }), container);
}