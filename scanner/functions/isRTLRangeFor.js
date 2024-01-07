function isRTLRangeFor(value) {
 let range = UnicodeRanges[13];
 if (value >= range.begin && value < range.end) {
  return true;
 }
 range = UnicodeRanges[11];
 if (value >= range.begin && value < range.end) {
  return true;
 }
 return false;
}