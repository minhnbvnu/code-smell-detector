function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys);
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path, keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path, keys, options);
}