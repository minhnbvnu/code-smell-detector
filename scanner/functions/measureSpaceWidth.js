function measureSpaceWidth() {
      var spaceWidthKey = 'space' + fontSize;
      var spaceWidth = avgLetterWidthByFontSize[spaceWidthKey];
      if (!spaceWidth) {
        textContainer.textContent = ' ';
        spaceWidth = measureTextWidth(textContainer);
        avgLetterWidthByFontSize[spaceWidthKey] = spaceWidth;
      }

      return spaceWidth;
    }