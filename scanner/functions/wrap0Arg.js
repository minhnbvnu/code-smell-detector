function wrap0Arg(f) {
  return function(cb) {
    return f(errorWrappedCallback(cb));
  }
}