function getCharCodes(charCodeToGlyphId, glyphId) {
        var charCodes = null;

        for (var charCode in charCodeToGlyphId) {
          if (glyphId === charCodeToGlyphId[charCode]) {
            if (!charCodes) {
              charCodes = [];
            }

            charCodes.push(charCode | 0);
          }
        }

        return charCodes;
      }