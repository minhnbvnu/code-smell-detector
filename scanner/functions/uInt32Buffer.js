function uInt32Buffer(n) {
  const buffer = Buffer(4);
  buffer.writeUInt32LE(n, 0);
  return buffer;
}