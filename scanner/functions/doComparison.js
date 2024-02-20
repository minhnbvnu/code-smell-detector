function doComparison(v1, v2) {
      var result = 0;
      for (var index=0, length = predicates.length; index < length; ++index) {
        result = compare(v1.predicateValues[index], v2.predicateValues[index]) * predicates[index].descending;
        if (result) break;
      }
      return result;
    }