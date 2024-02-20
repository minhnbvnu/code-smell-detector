function encodeCustomFloat(input) {
  const sign = input < 0 ? 1 : 0;

  input = Math.abs(input);

  const base10 = Math.floor(Math.log10(input));
  // Shift decimal to start of significand
  let exponent = 0 + base10;
  input /= Math.pow(10, base10);

  // Shift decimal to the right as far as we can
  while (!Number.isInteger(input) && input < MAX_SIGNIFICAND) {
    exponent -= 1;
    input *= 10;
  }

  // Reduce precision if necessary
  while (input > MAX_SIGNIFICAND) {
    exponent += 1;
    input /= 10;
  }

  input = Math.trunc(input);
  exponent += 11;

  const encoded = [
    input & 0x7f,
    (input >> 7) & 0x7f,
    (input >> 14) & 0x7f,
    ((input >> 21) & 0x03) | ((exponent & 0x0f) << 2) | ((sign & 0x01) << 6),
  ];

  return encoded;
}