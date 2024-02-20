function filterFilter() {
  return function(array, expression, comparator) {
    if (!isArrayLike(array)) {
      if (array == null) {
        return array;
      } else {
        throw minErr('filter')('notarray', 'Expected array but received: {0}', array);
      }
    }

    var expressionType = getTypeForFilter(expression);
    var predicateFn;
    var matchAgainstAnyProp;

    switch (expressionType) {
      case 'function':
        predicateFn = expression;
        break;
      case 'boolean':
      case 'null':
      case 'number':
      case 'string':
        matchAgainstAnyProp = true;
        //jshint -W086
      case 'object':
        //jshint +W086
        predicateFn = createPredicateFn(expression, comparator, matchAgainstAnyProp);
        break;
      default:
        return array;
    }

    return Array.prototype.filter.call(array, predicateFn);
  };
}