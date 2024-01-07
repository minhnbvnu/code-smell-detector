function encodeFloats(numbers, factor) {
  factor = factor ? factor : 1e5;
  for (let i = 0, ii = numbers.length; i < ii; ++i) {
    numbers[i] = Math.round(numbers[i] * factor);
  }

  return encodeSignedIntegers(numbers);
}