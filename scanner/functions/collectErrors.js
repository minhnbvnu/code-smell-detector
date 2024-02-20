function collectErrors(_ref) {
  var validations = _ref.validations,
      value = _ref.value,
      path = _ref.path,
      sync = _ref.sync,
      errors = _ref.errors,
      sort = _ref.sort;
  errors = unwrapError(errors);
  return settled(validations, sync).then(function (results) {
    var nestedErrors = results.filter(function (r) {
      return !r.fulfilled;
    }).reduce(function (arr, _ref2) {
      var error = _ref2.value;

      // we are only collecting validation errors
      if (!_ValidationError__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isError(error)) {
        throw error;
      }

      return arr.concat(error);
    }, []);
    if (sort) nestedErrors.sort(sort); //show parent errors after the nested ones: name.first, name

    errors = nestedErrors.concat(errors);
    if (errors.length) throw new _ValidationError__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](errors, value, path);
    return value;
  });
}