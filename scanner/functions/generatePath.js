function generatePath() {
  var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (pattern === '/') {
    return pattern;
  }

  var generator = compileGenerator(pattern);
  return generator(params);
}