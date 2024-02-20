function uint8(decoder) {
  var start = decoder.reserve(1);
  return decoder.buffer[start];
}