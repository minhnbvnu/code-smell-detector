function createCharCode(charCodeToGlyphId, glyphId) {
        for (var charCode in charCodeToGlyphId) {
          if (glyphId === charCodeToGlyphId[charCode]) {
            return charCode | 0;
          }
        }

        newMapping.charCodeToGlyphId[newMapping.nextAvailableFontCharCode] = glyphId;
        return newMapping.nextAvailableFontCharCode++;
      }