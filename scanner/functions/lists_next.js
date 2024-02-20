function lists_next(array, item) {
  if (array && array.length && item) {
    var idx = array.indexOf(item);
    return idx === -1 ? null : array[idx + 1];
  }

  return null;
}