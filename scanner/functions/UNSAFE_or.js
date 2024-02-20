function UNSAFE_or() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return getTypeMark.apply(void 0, ['or'].concat(args));
}