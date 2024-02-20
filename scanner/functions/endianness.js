function endianness(bytes, offset, start=0, end=bytes.length) {
  if (end % offset) {
    throw new Error("Bad buffer length.");
  }
  for (let index = start; index < end; index += offset) {
    swap(bytes, offset, index);
  }
}