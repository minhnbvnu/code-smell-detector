function getParser_(bits, fp, signed, clamp) {
  if (fp) {
    validateFloatType(bits);
  } else {
    validateIntType(bits);
  }
  if (fp && bits === 16) {
    return new IEEE754Buffer(5, 11);
  } else if (fp && bits == 32) {
    return new IEEE754Buffer(8, 23);
  } else if(fp && bits == 64) {
    return new IEEE754Buffer(11, 52);
  }
  return new IntParser(bits, signed, clamp);
}