function readInt8(data, start) {
  return (data[start] << 24) >> 24;
}