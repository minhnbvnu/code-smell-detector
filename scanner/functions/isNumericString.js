function isNumericString(str) {
  if (typeof str != 'string') return false; // we only process strings!
  // @ts-ignore
  return !isNaN(str) && !isNaN(parseFloat(str));
}