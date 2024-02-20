function toTypedArray(array, ArrayType, convertTypedArrays = false) {
  if (!array) {
    return null;
  }
  if (Array.isArray(array)) {
    return new ArrayType(array);
  }
  if (convertTypedArrays && !(array instanceof ArrayType)) {
    return new ArrayType(array);
  }
  return array;
}