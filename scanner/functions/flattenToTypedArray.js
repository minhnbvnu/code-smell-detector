function flattenToTypedArray(nestedArray, dimensions = 3, ArrayType = Float32Array) {
  if (nestedArray.length === 0) {
    return new Float32Array(0);
  }

  if (!checkVertices(nestedArray)) {
    return null;
  }

  // Handle case where the array is already flattened.
  if (isFlattened(nestedArray)) {
    return ArrayType.from(nestedArray);
  }

  const count = countVertices(nestedArray, dimensions);

  const typedArray = new ArrayType(count);
  flattenVerticesInPlace(nestedArray, typedArray, dimensions);
  return typedArray;
}