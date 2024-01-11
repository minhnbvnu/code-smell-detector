function getUnicodeRangeFor(value) {
 for (let i = 0, ii = UnicodeRanges.length; i < ii; i++) {
  const range = UnicodeRanges[i];
  if (value >= range.begin && value < range.end) {
   return i;
  }
 }
 return -1;
}