function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }