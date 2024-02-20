function unpackArrayTo(
    buffer, theType, output, start=0, end=buffer.length,
    safe=false, clamp=false) {
  theType = theType || {};
  /** @type {!Object} */
  let packer = getParser_(theType.bits, theType.fp, theType.signed, clamp);
  /** @type {number} */
  let offset = Math.ceil(theType.bits / 8);
  // getUnpackLen_ will either fix the length of the input buffer
  // according to the byte offset of the type (on unsafe mode) or
  // throw a Error if the input buffer has a bad length (on safe mode)
  end = getUnpackLen_(buffer, start, end, offset, safe);
  /** @type {number} */
  let index = 0;
  let j = start;
  try {
    if (theType.be) {
      endianness(buffer, offset, start, end);
    }
    for (; j < end; j += offset, index++) {
      output[index] = packer.unpack(buffer, j);
    }
    if (theType.be) {
      endianness(buffer, offset, start, end);
    }
  } catch (e) {
    throwValueError_(e, buffer.slice(j, j + offset), j);
  }
}