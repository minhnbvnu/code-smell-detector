function getPredicateValue(value, index) {
    var type = typeof value;
    if (value === null) {
      type = 'string';
      value = 'null';
    } else if (type === 'string') {
      value = value.toLowerCase();
    } else if (type === 'object') {
      value = objectValue(value, index);
    }
    return { value: value, type: type };
  }