function splitRangeBySize(start, end, chunkSize) {
  if (chunkSize === 0) {
    throw new Error('chunkSize of function splitRangeBySize should not be 0');
  }
  const res = [];
  while (start < end) {
    const size = Math.min(chunkSize, end - start);
    res.push({
      start,
      size
    });
    start = start + size;
  }
  return res;
}