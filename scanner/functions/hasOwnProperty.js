function hasOwnProperty(obj, key) {
  return obj && prototypeHasOwnProperty.call(obj, key);
}