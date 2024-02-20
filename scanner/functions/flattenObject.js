function flattenObject(key, object) {
  let typedArray = null;
  let size = 3;

  if (key === 'vertices' || key === 'points') {
    // Flatten nested vertices
    typedArray = flattenToTypedArray(object, size, Float32Array);
  }
  if (key === 'colors') {
    size = object[0].length === 4 ? 4 : 3;
    typedArray = flattenToTypedArray(object, size, Uint8Array);
  }

  if (typedArray) {
    return {
      typedArray,
      size
    };
  }

  return null;
}