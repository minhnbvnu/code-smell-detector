function adjustMapping(charCodeToGlyphId, hasGlyph, newGlyphZeroId) {
    var newMap = Object.create(null);
    var toFontChar = [];
    var privateUseAreaIndex = 0;
    var nextAvailableFontCharCode = PRIVATE_USE_AREAS[privateUseAreaIndex][0];
    var privateUseOffetEnd = PRIVATE_USE_AREAS[privateUseAreaIndex][1];

    for (var originalCharCode in charCodeToGlyphId) {
      originalCharCode |= 0;
      var glyphId = charCodeToGlyphId[originalCharCode];

      if (!hasGlyph(glyphId)) {
        continue;
      }

      if (nextAvailableFontCharCode > privateUseOffetEnd) {
        privateUseAreaIndex++;

        if (privateUseAreaIndex >= PRIVATE_USE_AREAS.length) {
          (0, _util.warn)("Ran out of space in font private use area.");
          break;
        }

        nextAvailableFontCharCode = PRIVATE_USE_AREAS[privateUseAreaIndex][0];
        privateUseOffetEnd = PRIVATE_USE_AREAS[privateUseAreaIndex][1];
      }

      var fontCharCode = nextAvailableFontCharCode++;

      if (glyphId === 0) {
        glyphId = newGlyphZeroId;
      }

      newMap[fontCharCode] = glyphId;
      toFontChar[originalCharCode] = fontCharCode;
    }

    return {
      toFontChar,
      charCodeToGlyphId: newMap,
      nextAvailableFontCharCode
    };
  }