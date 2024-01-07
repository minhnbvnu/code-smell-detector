function adjustToUnicode(properties, builtInEncoding) {
  if (properties.hasIncludedToUnicodeMap) {
    return;
  }

  if (properties.hasEncoding) {
    return;
  }

  if (builtInEncoding === properties.defaultEncoding) {
    return;
  }

  if (properties.toUnicode instanceof IdentityToUnicodeMap) {
    return;
  }

  var toUnicode = [],
      glyphsUnicodeMap = (0, _glyphlist.getGlyphsUnicode)();

  for (var charCode in builtInEncoding) {
    var glyphName = builtInEncoding[charCode];
    var unicode = (0, _unicode.getUnicodeForGlyph)(glyphName, glyphsUnicodeMap);

    if (unicode !== -1) {
      toUnicode[charCode] = String.fromCharCode(unicode);
    }
  }

  properties.toUnicode.amend(toUnicode);
}