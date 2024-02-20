function flattenVerticesInPlace(nestedArray, result, dimensions = 3) {
  flattenVerticesInPlaceRecursive(nestedArray, result, dimensions, 0);
  return result;
}