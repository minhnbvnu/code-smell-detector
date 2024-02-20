function sortByKeyOrder(fields) {
  var keys = Object.keys(fields);
  return function (a, b) {
    return findIndex(keys, a) - findIndex(keys, b);
  };
}