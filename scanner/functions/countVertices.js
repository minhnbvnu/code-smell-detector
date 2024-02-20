function countVertices(nestedArray, dimensions = 3) {
  let nestedCount = 0;
  let localCount = 0;
  let index = -1;
  while (++index < nestedArray.length) {
    const value = nestedArray[index];
    if (Array.isArray(value) || ArrayBuffer.isView(value)) {
      nestedCount += countVertices(value);
    } else {
      localCount++;
    }
  }
  return nestedCount + (nestedCount === 0 && localCount < dimensions ? dimensions : localCount);
}