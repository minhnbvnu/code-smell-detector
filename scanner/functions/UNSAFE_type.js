function UNSAFE_type(t) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  return getTypeMark.apply(void 0, [t].concat(args));
}