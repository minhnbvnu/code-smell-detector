function preciseMeasure(text) {
      var cachedWordsKey = text + fontSize;
      var size = cachedWords[cachedWordsKey];
      if (size === undefined) {
        textContainer.textContent = text;
        size = measureTextWidth(textContainer);
        if (size === 0 && text.length > 0) {
          // safari :(.
          var avgWidthAtFontSize = safariGuess[fontSize];
          if (avgWidthAtFontSize === undefined) throw new Error('Font size is not overriden for safari ' + fontSize);
          size = avgWidthAtFontSize * text.length;
        }
        cachedWords[cachedWordsKey] = size;
      }

      return size;
    }