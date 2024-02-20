function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }