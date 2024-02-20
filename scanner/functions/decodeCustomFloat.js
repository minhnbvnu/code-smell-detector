function decodeCustomFloat(input) {
  const exponent = ((input[3] >> 2) & 0x0f) - 11;
  const sign = (input[3] >> 6) & 0x01;

  let result =
    input[0] | (input[1] << 7) | (input[2] << 14) | ((input[3] & 0x03) << 21);

  if (sign) {
    result *= -1;
  }
  return result * Math.pow(10, exponent);
}