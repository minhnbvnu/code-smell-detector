function sortFields(fields, excludes) {
  if (excludes === void 0) {
    excludes = [];
  }

  var edges = [],
      nodes = [];

  function addNode(depPath, key) {
    var node = Object(property_expr__WEBPACK_IMPORTED_MODULE_2__["split"])(depPath)[0];
    if (!~nodes.indexOf(node)) nodes.push(node);
    if (!~excludes.indexOf(key + "-" + node)) edges.push([key, node]);
  }

  for (var key in fields) {
    if (Object(lodash_es_has__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(fields, key)) {
      var value = fields[key];
      if (!~nodes.indexOf(key)) nodes.push(key);
      if (_Reference__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isRef(value) && value.isSibling) addNode(value.path, key);else if (Object(_isSchema__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(value) && value._deps) value._deps.forEach(function (path) {
        return addNode(path, key);
      });
    }
  }

  return toposort__WEBPACK_IMPORTED_MODULE_1___default.a.array(nodes, edges).reverse();
}