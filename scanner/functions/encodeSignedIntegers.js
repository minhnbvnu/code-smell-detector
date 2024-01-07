function encodeSignedIntegers(numbers) {
  for (let i = 0, ii = numbers.length; i < ii; ++i) {
    const num = numbers[i];
    numbers[i] = num < 0 ? ~(num << 1) : num << 1;
  }
  return encodeUnsignedIntegers(numbers);
}