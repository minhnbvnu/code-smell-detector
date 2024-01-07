function createCounts(min, max, num) {
  const values = new Array(num);
  for (let i = 0; i < num; ++i) {
    values[i] = 0;
  }
  return {
    min: min,
    max: max,
    values: values,
    delta: (max - min) / num,
  };
}