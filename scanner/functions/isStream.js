function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}