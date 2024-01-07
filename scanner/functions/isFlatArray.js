function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}