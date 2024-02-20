function quoteRegExpMetaChars(str) {
  return str.replace(/[\\|.+*{}[]()?^$]/g, '\\$&');
}