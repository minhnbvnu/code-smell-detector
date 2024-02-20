function extractFont(font) {
  if (font == null) {
    return null;
  }
  if (typeof font === 'string') {
    return parseFontString(font);
  }
  var fontFamily = extractSingleFontFamily(font.fontFamily);
  var fontSize = +font.fontSize || 12;
  return {
    // Normalize
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: font.fontWeight,
    fontStyle: font.fontStyle,
  };
}