function fromValue(val, unsigned) {
  if (typeof val === 'number')
    return fromNumber(val, unsigned);
  if (typeof val === 'string')
    return fromString(val, unsigned);
  // Throws for non-objects, converts non-instanceof Long:
  return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}