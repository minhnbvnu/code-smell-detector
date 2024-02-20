function validateFloatType(bits) {
  if (!bits || bits !== 16 && bits !== 32 && bits !== 64) {
    throw new Error(TYPE_ERR + ': float, bits: ' + bits);
  }
}