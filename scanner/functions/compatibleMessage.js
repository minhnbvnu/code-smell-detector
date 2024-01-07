function compatibleMessage(thrown, errMatcher) {
    var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
    if (errMatcher instanceof RegExp) {
      return errMatcher.test(comparisonString);
    } else if (typeof errMatcher === 'string') {
      return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
    }

    return false;
  }