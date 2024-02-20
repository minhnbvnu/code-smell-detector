function returnHintsFromAtValues(atValues) {
          if (atValues)
            for (var i = 0; i < atValues.length; ++i) if (!prefix || matches(atValues[i], prefix, matchInMiddle))
              result.push(quote + atValues[i] + quote);
          return returnHints();
        }