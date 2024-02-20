function getUnpackLen_(buffer, start, end, offset, safe) {
  /** @type {number} */
  let extra = (end - start) % offset;
  if (safe && (extra || buffer.length < offset)) {
    throw new Error('Bad buffer length');
  }
  return end - extra;
}