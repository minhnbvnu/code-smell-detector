function defaultNegativeCompare() {
        var result = matcher.compare.apply(null, args);
        result.pass = !result.pass;
        return result;
      }