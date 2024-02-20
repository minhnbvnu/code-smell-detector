function measure(text, fontSize) {
    if (fontSize < 1) {
      // take only first three digits:
      fontSize = (Math.round(fontSize * 1000)) / 1000;
    }

    var cacheKey = text + fontSize;
    var cachedResult = cachedSizes[cacheKey];
    if (cachedResult) return cachedResult;
    var result = {};

    cachedSizes[cacheKey] = result;

    var textContainer = window.document.createElementNS(svgns, 'text');
    // set the font size that is requested.
    textContainer.setAttributeNS(null, 'font-size', fontSize);
    // we need this to measure words separators.
    textContainer.setAttributeNS(xmlns, 'xml:space', 'preserve');

    svgContainer.appendChild(textContainer);

    result.words = text.split(/\s/).map(toWordWidths);
    result.spaceWidth = measureSpaceWidth();
    result.totalWidth = sumUpWordsLengthInPixels(result.words, result.spaceWidth);

    svgContainer.removeChild(textContainer);

    return result;

    function sumUpWordsLengthInPixels(words, spaceWidth) {
      var width = 0;

      words.forEach(function(word) { width += word.width; });
      width += (words.length - 1) * spaceWidth;

      return width;
    }

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

    function toWordWidths(text) {
      return {
        text: text,
        width: measureText(text)
      };
    }

    function measureText(text) {
      return options.useFastTextMeasure ? measureAvgWidth(text) : preciseMeasure(text);
    }

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
  }