function extraSpaces(index) {
        var spaceLength = 0;
        if (index !== -1) {
          var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
          if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === "") {
            spaceLength = textBetweenClosingQuoteAndIndex.length;
          }
        }
        return spaceLength;
      }