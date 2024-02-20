function isFixedPitch(glyphs) {
        for (var i = 0, ii = glyphs.length - 1; i < ii; i++) {
          if (glyphs[i] != glyphs[i + 1])
            return false;
        }
        return true;
      }