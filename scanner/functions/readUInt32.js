function readUInt32(buffer, offset, is_big_endian) {
  return is_big_endian ? readUInt32BE(buffer, offset) : readUInt32LE(buffer, offset);
}