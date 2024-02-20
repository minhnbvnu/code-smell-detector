function getComponent(maps, name) {
  var ns = name.split('.');
  var key = ns.shift();

  if (!Object(__WEBPACK_IMPORTED_MODULE_4__core_obx_utils__["k" /* hasOwnProperty */])(maps, key)) {
    return null;
  }

  var component = maps[key];

  while (ns.length > 0) {
    key = ns.shift();
    component = component[key];

    if (!component) {
      return notFound(name);
    }
  }

  return component;
}