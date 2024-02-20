function isStringable(value) {
    return hasKey(value, 'toString') || isClassOf(value, 'String');
  }