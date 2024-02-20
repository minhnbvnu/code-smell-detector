function findArray(array, searchedValue) {
  return find(array, function(currentValue) {
    return isEqual(currentValue, searchedValue);
  });
}