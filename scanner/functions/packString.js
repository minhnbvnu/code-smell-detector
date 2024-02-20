function packString(str) {
  /** @type {!Array<number>} */
  let buffer = [];
  pack(str, buffer, 0);
  return buffer;
}