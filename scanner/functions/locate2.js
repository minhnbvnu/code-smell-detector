function locate2(search, startIndex) {
      if (typeof search === "string") {
        search = source.indexOf(search, startIndex || 0);
      }
      var range = lineRanges[i];
      var d2 = search >= range.end ? 1 : -1;
      while (range) {
        if (rangeContains(range, search))
          return getLocation(range, search);
        i += d2;
        range = lineRanges[i];
      }
    }