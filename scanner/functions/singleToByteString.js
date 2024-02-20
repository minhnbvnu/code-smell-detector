function singleToByteString(n) {
  return String.fromCharCode(
    (n & 0xff) >> 0,
    (n & 0xff00) >> 8,
    (n & 0xff0000) >> 16,
    (n & 0xff000000) >> 24
  );
}