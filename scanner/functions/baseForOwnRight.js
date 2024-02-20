function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }