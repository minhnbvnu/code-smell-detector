function cartesianProduct(arrs, start, end) {
  const size = end - start;
  let resultLength = 1;
  for (let i = start; i < end; i++) {
    resultLength *= arrs[i].length;
  }
  if (resultLength > 1e6) {
    throw new RangeError("Far too many elements to interpolate");
  }
  const result = new Array(resultLength);
  const indices = new Array(size).fill(0);
  for (let i = 0; i < resultLength; i++) {
    const value = result[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      value[j] = arrs[j + start][indices[j]];
    }
    for (let j = size - 1; j >= 0; j--) {
      if (++indices[j] < arrs[j + start].length) break;
      indices[j] = 0;
    }
  }
  return result;
}