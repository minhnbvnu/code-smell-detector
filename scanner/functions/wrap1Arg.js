function wrap1Arg(f) {
  return function(v, cb) {
    return f(v, errorWrappedCallback(cb));
  }
}