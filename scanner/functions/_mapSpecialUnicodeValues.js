function mapSpecialUnicodeValues(code) {
 if (code >= 0xfff0 && code <= 0xffff) {
  return 0;
 } else if (code >= 0xf600 && code <= 0xf8ff) {
  return getSpecialPUASymbols()[code] || code;
 } else if (code === 0x00ad) {
  return 0x002d;
 }
 return code;
}