function decodeFloats(encoded, factor) {
  factor = factor ? factor : 1e5;
  const numbers = decodeSignedIntegers(encoded);
  for (let i = 0, ii = numbers.length; i < ii; ++i) {
    numbers[i] /= factor;
  }
  return numbers;
}