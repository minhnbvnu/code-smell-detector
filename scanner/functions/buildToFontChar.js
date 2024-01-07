function buildToFontChar(encoding, glyphsUnicodeMap, differences) {
    var toFontChar = [],
        unicode;

    for (var i = 0, ii = encoding.length; i < ii; i++) {
      unicode = (0, _unicode.getUnicodeForGlyph)(encoding[i], glyphsUnicodeMap);

      if (unicode !== -1) {
        toFontChar[i] = unicode;
      }
    }

    for (var charCode in differences) {
      unicode = (0, _unicode.getUnicodeForGlyph)(differences[charCode], glyphsUnicodeMap);

      if (unicode !== -1) {
        toFontChar[+charCode] = unicode;
      }
    }

    return toFontChar;
  }