function parseIfString (val) {
  if (val !== null && val !== undefined && val.constructor === String) {
    return parseFloat(val, 10);
  }
  return val;
}