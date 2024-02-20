function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}