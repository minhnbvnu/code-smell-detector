function normalizeProjectAnnotations(_ref) {
  var argTypes = _ref.argTypes,
      globalTypes = _ref.globalTypes,
      argTypesEnhancers = _ref.argTypesEnhancers,
      annotations = _objectWithoutProperties(_ref, _excluded);

  return Object.assign({}, argTypes && {
    argTypes: Object(_normalizeInputTypes__WEBPACK_IMPORTED_MODULE_16__[/* normalizeInputTypes */ "a"])(argTypes)
  }, globalTypes && {
    globalTypes: Object(_normalizeInputTypes__WEBPACK_IMPORTED_MODULE_16__[/* normalizeInputTypes */ "a"])(globalTypes)
  }, {
    argTypesEnhancers: [].concat(_toConsumableArray(argTypesEnhancers || []), [_inferArgTypes__WEBPACK_IMPORTED_MODULE_14__[/* inferArgTypes */ "a"], // inferControls technically should only run if the user is using the controls addon,
    // and so should be added by a preset there. However, as it seems some code relies on controls
    // annotations (in particular the angular implementation's `cleanArgsDecorator`), for backwards
    // compatibility reasons, we will leave this in the store until 7.0
    _inferControls__WEBPACK_IMPORTED_MODULE_15__[/* inferControls */ "a"]])
  }, annotations);
}