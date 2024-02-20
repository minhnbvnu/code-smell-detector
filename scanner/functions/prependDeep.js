function prependDeep(target, source) {
  for (var key in source) {
    if (Object(lodash_es_has__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(source, key)) {
      var sourceVal = source[key],
          targetVal = target[key];

      if (targetVal === undefined) {
        target[key] = sourceVal;
      } else if (targetVal === sourceVal) {
        continue;
      } else if (Object(_isSchema__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(targetVal)) {
        if (Object(_isSchema__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(sourceVal)) target[key] = sourceVal.concat(targetVal);
      } else if (isObject(targetVal)) {
        if (isObject(sourceVal)) target[key] = prependDeep(targetVal, sourceVal);
      } else if (Array.isArray(targetVal)) {
        if (Array.isArray(sourceVal)) target[key] = sourceVal.concat(targetVal);
      }
    }
  }

  return target;
}