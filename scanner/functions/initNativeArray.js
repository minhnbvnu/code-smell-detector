function initNativeArray (shape, i) {
      i = i || 0;
      var c = shape[i] | 0;
      if (c <= 0) { return []; }
      var result = new Array(c);
      var j;
      if (i === shape.length - 1) {
        for (j = 0; j < c; ++j) {
          result[j] = 0;
        }
      } else {
        for (j = 0; j < c; ++j) {
          result[j] = initNativeArray(shape, i + 1);
        }
      }
      return result;
    }