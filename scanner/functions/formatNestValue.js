function formatNestValue(nestPath, val) {
  if (!nestPath) {
    return val;
  }

  var pathArray = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["w" /* splitPath */])(nestPath, true);

  if (!pathArray) {
    return val;
  }

  var _pathArray = __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_slicedToArray___default()(pathArray, 3),
      _ = _pathArray[0],
      path = _pathArray[1],
      key = _pathArray[2];

  return formatNestValue(path, key ? __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_defineProperty___default()({}, key, val) : val);
}