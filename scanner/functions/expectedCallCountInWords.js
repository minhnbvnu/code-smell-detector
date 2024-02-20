function expectedCallCountInWords(expectation) {
      var min = expectation.minCalls;
      var max = expectation.maxCalls;

      if (typeof min == "number" && typeof max == "number") {
        var str = times(min);

        if (min != max) {
          str = "at least " + str + " and at most " + times(max);
        }

        return str;
      }

      if (typeof min == "number") {
        return "at least " + times(min);
      }

      return "at most " + times(max);
    }