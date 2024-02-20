function readUIntBE(data, offset, size) {
  var result = 0;

  for (var i = 0; i < size; i++) {
    result = result * 256 + (data[offset + i] || 0);
  }

  return result;
}