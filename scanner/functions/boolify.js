function boolify(val) {
  return !FALSY_STRINGS.has(val.toString().toLowerCase());
}