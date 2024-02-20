function packArray(values, theType, clamp=false) {
  /** @type {!Array<number>} */
  let output = [];
  packArrayTo(values, theType, output, 0, clamp);
  return output;
}