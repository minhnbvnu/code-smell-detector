function UNSAFE_and() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return getTypeMark.apply(void 0, ['and'].concat(args));
}