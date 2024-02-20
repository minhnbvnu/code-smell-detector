function makeNoAuth() {
  return function noop(req, res, next) {
    next();
  };
}