function copy_array(array, src) {
  for (var i = 0; i < src.length; i++) {
    array[i] = src[i];
  }
  return array;
}