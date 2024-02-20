function mockable(fn) {
  var f = function f() {
    if (f.mock) {
      return f.mock.apply(f, arguments);
    }

    return fn.apply(void 0, arguments);
  };

  return f;
}