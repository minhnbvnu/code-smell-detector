function splitPath(path) {
  var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return reverse ? RE_PATH_REVERSE.exec(path) : RE_PATH.exec(path);
}