function concat(array1, array2, index) {
  return array1.concat(slice.call(array2, index));
}