function buildTextGeometry(chars, textChunk) {
        var font = textState.font;
        textChunk = textChunk || newTextChunk();
        if (!textChunk.transform) {
          // 9.4.4 Text Space Details
          var tsm = [textState.fontSize * textState.textHScale, 0,
                     0, textState.fontSize,
                     0, textState.textRise];
          var trm = textChunk.transform = Util.transform(textState.ctm,
                                    Util.transform(textState.textMatrix, tsm));
          if (!font.vertical) {
            textChunk.height = Math.sqrt(trm[2] * trm[2] + trm[3] * trm[3]);
          } else {
            textChunk.width = Math.sqrt(trm[0] * trm[0] + trm[1] * trm[1]);
          }
        }
        var width = 0;
        var height = 0;
        var glyphs = font.charsToGlyphs(chars);
        var defaultVMetrics = font.defaultVMetrics;
        for (var i = 0; i < glyphs.length; i++) {
          var glyph = glyphs[i];
          if (!glyph) { // Previous glyph was a space.
            width += textState.wordSpacing * textState.textHScale;
            continue;
          }
          var vMetricX = null;
          var vMetricY = null;
          var glyphWidth = null;
          if (font.vertical) {
            if (glyph.vmetric) {
              glyphWidth = glyph.vmetric[0];
              vMetricX = glyph.vmetric[1];
              vMetricY = glyph.vmetric[2];
            } else {
              glyphWidth = glyph.width;
              vMetricX = glyph.width * 0.5;
              vMetricY = defaultVMetrics[2];
            }
          } else {
            glyphWidth = glyph.width;
          }

          var glyphUnicode = glyph.unicode;
          if (NormalizedUnicodes[glyphUnicode] !== undefined) {
            glyphUnicode = NormalizedUnicodes[glyphUnicode];
          }
          glyphUnicode = reverseIfRtl(glyphUnicode);

          // The following will calculate the x and y of the individual glyphs.
          // if (font.vertical) {
          //   tsm[4] -= vMetricX * Math.abs(textState.fontSize) *
          //             textState.fontMatrix[0];
          //   tsm[5] -= vMetricY * textState.fontSize *
          //             textState.fontMatrix[0];
          // }
          // var trm = Util.transform(textState.textMatrix, tsm);
          // var pt = Util.applyTransform([trm[4], trm[5]], textState.ctm);
          // var x = pt[0];
          // var y = pt[1];

          var tx = 0;
          var ty = 0;
          if (!font.vertical) {
            var w0 = glyphWidth * textState.fontMatrix[0];
            tx = (w0 * textState.fontSize + textState.charSpacing) *
                 textState.textHScale;
            width += tx;
          } else {
            var w1 = glyphWidth * textState.fontMatrix[0];
            ty = w1 * textState.fontSize + textState.charSpacing;
            height += ty;
          }
          textState.translateTextMatrix(tx, ty);

          textChunk.str.push(glyphUnicode);
        }

        var a = textState.textLineMatrix[0];
        var b = textState.textLineMatrix[1];
        var scaleLineX = Math.sqrt(a * a + b * b);
        a = textState.ctm[0];
        b = textState.ctm[1];
        var scaleCtmX = Math.sqrt(a * a + b * b);
        if (!font.vertical) {
          textChunk.width += width * scaleCtmX * scaleLineX;
        } else {
          textChunk.height += Math.abs(height * scaleCtmX * scaleLineX);
        }
        return textChunk;
      }