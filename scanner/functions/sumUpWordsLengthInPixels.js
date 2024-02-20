function sumUpWordsLengthInPixels(words, spaceWidth) {
      var width = 0;

      words.forEach(function(word) { width += word.width; });
      width += (words.length - 1) * spaceWidth;

      return width;
    }