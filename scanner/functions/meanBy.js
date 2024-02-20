function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }