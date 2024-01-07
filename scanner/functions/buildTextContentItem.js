function buildTextContentItem(chars) {
      var font = textState.font;
      var textChunk = ensureTextContentItem();
      var width = 0;
      var height = 0;
      var glyphs = font.charsToGlyphs(chars);

      for (var i = 0; i < glyphs.length; i++) {
        var glyph = glyphs[i];
        var glyphWidth = null;

        if (font.vertical && glyph.vmetric) {
          glyphWidth = glyph.vmetric[0];
        } else {
          glyphWidth = glyph.width;
        }

        var glyphUnicode = glyph.unicode;
        var NormalizedUnicodes = (0, _unicode.getNormalizedUnicodes)();

        if (NormalizedUnicodes[glyphUnicode] !== undefined) {
          glyphUnicode = NormalizedUnicodes[glyphUnicode];
        }

        glyphUnicode = (0, _unicode.reverseIfRtl)(glyphUnicode);
        var charSpacing = textState.charSpacing;

        if (glyph.isSpace) {
          var wordSpacing = textState.wordSpacing;
          charSpacing += wordSpacing;

          if (wordSpacing > 0) {
            addFakeSpaces(wordSpacing, textChunk.str);
          }
        }

        var tx = 0;
        var ty = 0;

        if (!font.vertical) {
          var w0 = glyphWidth * textState.fontMatrix[0];
          tx = (w0 * textState.fontSize + charSpacing) * textState.textHScale;
          width += tx;
        } else {
          var w1 = glyphWidth * textState.fontMatrix[0];
          ty = w1 * textState.fontSize + charSpacing;
          height += ty;
        }

        textState.translateTextMatrix(tx, ty);
        textChunk.str.push(glyphUnicode);
      }

      if (!font.vertical) {
        textChunk.lastAdvanceWidth = width;
        textChunk.width += width;
      } else {
        textChunk.lastAdvanceHeight = height;
        textChunk.height += Math.abs(height);
      }

      return textChunk;
    }