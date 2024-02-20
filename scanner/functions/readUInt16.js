function readUInt16(buffer, offset, is_big_endian) {
  return is_big_endian ? readUInt16BE(buffer, offset) : readUInt16LE(buffer, offset);
}