function normalizeValues(matrix, vals) {
    reverseUnits.reduce(function (previous, current) {
      if (!isUndefined(vals[current])) {
        if (previous) {
          convert(matrix, vals, previous, vals, current);
        }

        return current;
      } else {
        return previous;
      }
    }, null);
  }