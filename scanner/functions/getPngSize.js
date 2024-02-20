function getPngSize(contents) {
  // Check file contains the first 4 bytes of the PNG signature.
  if (contents.readUInt32BE(0) !== 0x89504e47) {
    return null;
  }

  const width = contents.readUInt32BE(16);
  const height = contents.readUInt32BE(20);
  return {width, height};
}