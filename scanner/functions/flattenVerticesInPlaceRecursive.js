function flattenVerticesInPlaceRecursive(nestedArray, result, dimensions, insert) {
  let index = -1;
  let vertexLength = 0;
  while (++index < nestedArray.length) {
    const value = nestedArray[index];
    if (Array.isArray(value) || ArrayBuffer.isView(value)) {
      insert = flattenVerticesInPlaceRecursive(value, result, dimensions, insert);
    } else {
      // eslint-disable-next-line
      if (vertexLength < dimensions) {
        result[insert++] = value;
        vertexLength++;
      }
    }
  }
  // Add a third coordinate if needed
  if (vertexLength > 0 && vertexLength < dimensions) {
    result[insert++] = 0;
  }
  return insert;
}