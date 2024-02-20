function isStrictComparable(value) {
      return value === value && !isObject(value);
    }