function ensureTextContentItem() {
      if (textContentItem.initialized) {
        return textContentItem;
      }

      const font = textState.font,
            loadedName = font.loadedName;

      if (!seenStyles.has(loadedName)) {
        seenStyles.add(loadedName);
        textContent.styles[loadedName] = {
          fontFamily: font.fallbackName,
          ascent: font.ascent,
          descent: font.descent,
          vertical: font.vertical
        };
      }

      textContentItem.fontName = loadedName;
      var tsm = [textState.fontSize * textState.textHScale, 0, 0, textState.fontSize, 0, textState.textRise];

      if (font.isType3Font && textState.fontSize <= 1 && !(0, _util.isArrayEqual)(textState.fontMatrix, _util.FONT_IDENTITY_MATRIX)) {
        const glyphHeight = font.bbox[3] - font.bbox[1];

        if (glyphHeight > 0) {
          tsm[3] *= glyphHeight * textState.fontMatrix[3];
        }
      }

      var trm = _util.Util.transform(textState.ctm, _util.Util.transform(textState.textMatrix, tsm));

      textContentItem.transform = trm;

      if (!font.vertical) {
        textContentItem.width = 0;
        textContentItem.height = Math.hypot(trm[2], trm[3]);
        textContentItem.vertical = false;
      } else {
        textContentItem.width = Math.hypot(trm[0], trm[1]);
        textContentItem.height = 0;
        textContentItem.vertical = true;
      }

      const scaleLineX = Math.hypot(textState.textLineMatrix[0], textState.textLineMatrix[1]);
      const scaleCtmX = Math.hypot(textState.ctm[0], textState.ctm[1]);
      textContentItem.textAdvanceScale = scaleCtmX * scaleLineX;
      textContentItem.lastAdvanceWidth = 0;
      textContentItem.lastAdvanceHeight = 0;
      var spaceWidth = font.spaceWidth / 1000 * textState.fontSize;

      if (spaceWidth) {
        textContentItem.spaceWidth = spaceWidth;
        textContentItem.fakeSpaceMin = spaceWidth * SPACE_FACTOR;
        textContentItem.fakeMultiSpaceMin = spaceWidth * MULTI_SPACE_FACTOR;
        textContentItem.fakeMultiSpaceMax = spaceWidth * MULTI_SPACE_FACTOR_MAX;
        textContentItem.textRunBreakAllowed = !font.isMonospace;
      } else {
        textContentItem.spaceWidth = 0;
        textContentItem.fakeSpaceMin = Infinity;
        textContentItem.fakeMultiSpaceMin = Infinity;
        textContentItem.fakeMultiSpaceMax = 0;
        textContentItem.textRunBreakAllowed = false;
      }

      textContentItem.initialized = true;
      return textContentItem;
    }