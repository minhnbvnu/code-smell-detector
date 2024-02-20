function measureAvgWidth(text) {
      var avgWidthAtFontSize = avgLetterWidthByFontSize[fontSize];
      if (!avgWidthAtFontSize) {
        textContainer.textContent = abc;
        var abcWidth = measureTextWidth(textContainer);
        avgWidthAtFontSize = abcWidth/abc.length;

        if (avgWidthAtFontSize === 0) {
          // safari at small fonts :(. Not super proud of this, but not sure how
          // to fix this better.
          avgWidthAtFontSize = safariGuess[fontSize]
        }

        avgLetterWidthByFontSize[fontSize] = avgWidthAtFontSize;
      }

      return avgWidthAtFontSize * text.length;
    }