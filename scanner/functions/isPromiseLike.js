function isPromiseLike(obj) {
  return obj && isFunction(obj.then);
}