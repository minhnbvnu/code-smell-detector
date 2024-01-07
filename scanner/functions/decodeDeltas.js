function decodeDeltas(encoded, stride, factor) {
  factor = factor ? factor : 1e5;
  let d;

  /** @type {Array<number>} */
  const lastNumbers = new Array(stride);
  for (d = 0; d < stride; ++d) {
    lastNumbers[d] = 0;
  }

  const numbers = decodeFloats(encoded, factor);

  for (let i = 0, ii = numbers.length; i < ii; ) {
    for (d = 0; d < stride; ++d, ++i) {
      lastNumbers[d] += numbers[i];

      numbers[i] = lastNumbers[d];
    }
  }

  return numbers;
}