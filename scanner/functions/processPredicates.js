function processPredicates(sortPredicate, reverseOrder) {
    reverseOrder = reverseOrder ? -1 : 1;
    return sortPredicate.map(function(predicate) {
      var descending = 1, get = identity;

      if (isFunction(predicate)) {
        get = predicate;
      } else if (isString(predicate)) {
        if ((predicate.charAt(0) == '+' || predicate.charAt(0) == '-')) {
          descending = predicate.charAt(0) == '-' ? -1 : 1;
          predicate = predicate.substring(1);
        }
        if (predicate !== '') {
          get = $parse(predicate);
          if (get.constant) {
            var key = get();
            get = function(value) { return value[key]; };
          }
        }
      }
      return { get: get, descending: descending * reverseOrder };
    });
  }