function looseIndexOf(arr, val) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (looseEqual(arr[i], val)) return i;
  }

  return -1;
}