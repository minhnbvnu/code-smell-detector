function getBmpSize(contents) {
  // Check magic number is valid (first 2 characters should be "BM").
  if (contents.readUInt16BE(0) !== 0x424d) {
    return null;
  }

  // BMP is little endian.
  const width = contents.readUInt32LE(18);
  const height = contents.readUInt32LE(22);
  return {width, height};
}