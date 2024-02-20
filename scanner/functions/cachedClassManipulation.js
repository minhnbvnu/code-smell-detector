function cachedClassManipulation(cache, classes, op) {
      for (var i=0, ii = classes.length; i < ii; ++i) {
        var className = classes[i];
        cache[className] = op;
      }
    }