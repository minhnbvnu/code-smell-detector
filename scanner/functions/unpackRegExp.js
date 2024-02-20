function unpackRegExp(value) {
  return RegExp.apply(null, value);
}