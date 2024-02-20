function getGifSize(contents) {
  // Check first 4 bytes of the GIF signature ("GIF8").
  if (contents.readUInt32BE(0) !== 0x47494638) {
    return null;
  }

  // GIF is little endian.
  const width = contents.readUInt16LE(6);
  const height = contents.readUInt16LE(8);
  return {width, height};
}