function byte_data_pack(value, theType, clamp=false) {
  /** @type {!Array<number>} */
  let output = [];
  packTo(value, theType, output, 0, clamp);
  return output;
}