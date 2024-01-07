function reverseValues(arr, start, end) {
  for (var i = start, j = end - 1; i < j; ++i, --j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}