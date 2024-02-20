function createBst(sourceArray) {
  if (sourceArray === null) {
    return null;
  }

  const start = 0;
  const end = sourceArray.length - 1;

  return getNode(start, end, sourceArray);
}