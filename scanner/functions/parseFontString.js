function parseFontString(font) {
  if (cachedFontObjectsFromString.hasOwnProperty(font)) {
    return cachedFontObjectsFromString[font];
  }
  var regexp = /^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?)[ptexm\%]*(?:\s*\/.*?)?\s+)?\s*\"?([^\"]*)/i;
  var match = regexp.exec(font);
  if (!match) {
    return null;
  }
  var fontFamily = extractSingleFontFamily(match[3]);
  var fontSize = +match[2] || 12;
  var isBold = /bold/.exec(match[1]);
  var isItalic = /italic/.exec(match[1]);
  cachedFontObjectsFromString[font] = {
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
  };
  return cachedFontObjectsFromString[font];
}