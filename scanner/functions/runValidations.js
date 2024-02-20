function runValidations(_ref3) {
  var endEarly = _ref3.endEarly,
      options = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_ref3, ["endEarly"]);

  if (endEarly) return scopeToValue(options.validations, options.value, options.sync);
  return collectErrors(options);
}