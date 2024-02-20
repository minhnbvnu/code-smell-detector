function maybeInstantiate(scope, score) {
    var fn = functionScope(scope).fnType;
    if (fn) fn.instantiateScore = (fn.instantiateScore || 0) + score;
  }