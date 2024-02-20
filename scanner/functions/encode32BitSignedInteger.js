function encode32BitSignedInteger(data) {
  const negative = data < 0;

  data = Math.abs(data);

  const encoded = [
    data & 0x7f,
    (data >> 7) & 0x7f,
    (data >> 14) & 0x7f,
    (data >> 21) & 0x7f,
    (data >> 28) & 0x07,
  ];

  if (negative) {
    encoded[encoded.length - 1] |= 0x08;
  }

  return encoded;
}