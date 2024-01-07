function computeAdler32(bytes) {
  const bytesLength = bytes.length;
  let a = 1,
      b = 0;

  for (let i = 0; i < bytesLength; ++i) {
    a += bytes[i] & 0xff;
    b += a;
  }

  return b % 65521 << 16 | a % 65521;
}