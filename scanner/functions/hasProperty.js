function hasProperty(obj, name) {
    if (typeof obj === 'undefined' || obj === null) {
      return false;
    }

    // The `in` operator does not work with primitives.
    return name in Object(obj);
  }