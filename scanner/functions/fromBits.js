function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}