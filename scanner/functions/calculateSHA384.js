function calculateSHA384(data, offset, length) {
  return calculateSHA512(data, offset, length, true);
}