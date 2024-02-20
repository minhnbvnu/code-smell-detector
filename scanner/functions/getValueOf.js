function getValueOf(value) {
  return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value);
}