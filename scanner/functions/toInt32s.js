function toInt32s(arr) {
  for (var i = 0; i < arr.length; ++i) {
    arr[i] = arr[i] & 0xFFFFFFFF;
  }
}