function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }