function guessDelimiter(input, newline, skipEmptyLines, comments, delimitersToGuess) {
      var bestDelim, bestDelta, fieldCountPrevRow;
      delimitersToGuess = delimitersToGuess || [",", "	", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP];
      for (var i = 0; i < delimitersToGuess.length; i++) {
        var delim = delimitersToGuess[i];
        var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
        fieldCountPrevRow = void 0;
        var preview = new Parser({
          comments,
          delimiter: delim,
          newline,
          preview: 10
        }).parse(input);
        for (var j = 0; j < preview.data.length; j++) {
          if (skipEmptyLines && testEmptyLine(preview.data[j])) {
            emptyLinesCount++;
            continue;
          }
          var fieldCount = preview.data[j].length;
          avgFieldCount += fieldCount;
          if (typeof fieldCountPrevRow === "undefined") {
            fieldCountPrevRow = 0;
            continue;
          } else if (fieldCount > 1) {
            delta += Math.abs(fieldCount - fieldCountPrevRow);
            fieldCountPrevRow = fieldCount;
          }
        }
        if (preview.data.length > 0)
          avgFieldCount /= preview.data.length - emptyLinesCount;
        if ((typeof bestDelta === "undefined" || delta > bestDelta) && avgFieldCount > 1.99) {
          bestDelta = delta;
          bestDelim = delim;
        }
      }
      _config.delimiter = bestDelim;
      return {
        successful: !!bestDelim,
        bestDelimiter: bestDelim
      };
    }