function copy_string(array, src) {
  for (var i = 0; i < src.length; i++) {
    array[i] = src.charCodeAt(i);
  }
  return array;
}