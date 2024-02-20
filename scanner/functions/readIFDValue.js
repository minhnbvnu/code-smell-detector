function readIFDValue(data, data_offset, is_big_endian) {
  var type       = readUInt16(data, data_offset + 2, is_big_endian);
  var values     = readUInt32(data, data_offset + 4, is_big_endian);

  if (values !== 1 || (type !== 3 && type !== 4)) return null;

  if (type === 3) {
    return readUInt16(data, data_offset + 8, is_big_endian);
  }

  return readUInt32(data, data_offset + 8, is_big_endian);
}