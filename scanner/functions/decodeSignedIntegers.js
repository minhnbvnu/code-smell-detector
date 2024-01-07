function decodeSignedIntegers(encoded) {
  const numbers = decodeUnsignedIntegers(encoded);
  for (let i = 0, ii = numbers.length; i < ii; ++i) {
    const num = numbers[i];
    numbers[i] = num & 1 ? ~(num >> 1) : num >> 1;
  }
  return numbers;
}