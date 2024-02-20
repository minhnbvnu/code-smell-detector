function convertUnconventionalData(data) {
  if (!isObject(data)) {
    return data;
  }

  var result = data;
  var wasMutated = false; // `Event` has a weird structure, for details see `extractEventHiddenProperties` doc
  // Plus we need to check if running in a browser to ensure `Event` exist and
  // is really the dom Event class.

  if (isRunningInBrowser && data instanceof Event) {
    result = Object(_dom_event__WEBPACK_IMPORTED_MODULE_6__[/* extractEventHiddenProperties */ "a"])(result);
    wasMutated = true;
  }

  result = Object.keys(result).reduce(function (acc, key) {
    try {
      var _result$key;

      // Try accessing a property to test if we are allowed to do so
      // eslint-disable-next-line no-unused-expressions
      (_result$key = result[key]) === null || _result$key === void 0 ? void 0 : _result$key.toJSON;
      acc[key] = result[key];
    } catch (err) {
      wasMutated = true;
    }

    return acc;
  }, {});
  return wasMutated ? result : data;
}