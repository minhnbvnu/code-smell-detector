function decode32BitSignedInteger(bytes) {
  let result =
    (bytes[0] & 0x7f) |
    ((bytes[1] & 0x7f) << 7) |
    ((bytes[2] & 0x7f) << 14) |
    ((bytes[3] & 0x7f) << 21) |
    ((bytes[4] & 0x07) << 28);

  if (bytes[4] >> 3) {
    result *= -1;
  }

  return result;
}