function packArrayTo(values, theType, buffer, index=0, clamp=false) {
  theType = theType || {};
  /** @type {!Object} */
  let packer = getParser_(theType.bits, theType.fp, theType.signed, clamp);
  /** @type {number} */
  let offset = Math.ceil(theType.bits / 8);
  /** @type {number} */
  let i = 0;
  /** @type {number} */
  let start = index;
  try {
    for (let valuesLen = values.length; i < valuesLen; i++) {
      index = packer.pack(buffer, values[i], index);
    }
    if (theType.be) {
      endianness(buffer, offset, start, index);
    }
  } catch (e) {
    throwValueError_(e, values[i], i);
  }
  return index;
}