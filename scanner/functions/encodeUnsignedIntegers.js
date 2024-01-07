function encodeUnsignedIntegers(numbers) {
  let encoded = '';
  for (let i = 0, ii = numbers.length; i < ii; ++i) {
    encoded += encodeUnsignedInteger(numbers[i]);
  }
  return encoded;
}