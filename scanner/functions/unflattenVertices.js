function unflattenVertices(array, vertexCount) {
  if (Array.isArray(array[0])) {
    return array;
  }
  const stride = vertexCount ? array.length / vertexCount : 3;
  const result = [];
  for (let i = 0; i < array.length; i += stride) {
    result.push(array.slice(i, i + stride));
  }
  return result;
}