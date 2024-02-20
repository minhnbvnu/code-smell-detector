function init_seq(array, length) {
  for (var i = 0; i < length; i++) {
    array[i] = i & 255;
  }
  return array;
}