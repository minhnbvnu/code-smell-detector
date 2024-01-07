function findUnequal(arr, start, value) {
  for (var j = start, jj = arr.length; j < jj; ++j) {
    if (arr[j] !== value) {
      return j;
    }
  }

  return j;
}