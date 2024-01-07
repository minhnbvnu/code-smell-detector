function encodeDeltas(numbers, stride, factor) {
  factor = factor ? factor : 1e5;
  let d;

  const lastNumbers = new Array(stride);
  for (d = 0; d < stride; ++d) {
    lastNumbers[d] = 0;
  }

  for (let i = 0, ii = numbers.length; i < ii; ) {
    for (d = 0; d < stride; ++d, ++i) {
      const num = numbers[i];
      const delta = num - lastNumbers[d];
      lastNumbers[d] = num;

      numbers[i] = delta;
    }
  }

  return encodeFloats(numbers, factor);
}