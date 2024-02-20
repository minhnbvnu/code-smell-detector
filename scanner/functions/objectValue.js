function objectValue(value, index) {
    // If `valueOf` is a valid function use that
    if (typeof value.valueOf === 'function') {
      value = value.valueOf();
      if (isPrimitive(value)) return value;
    }
    // If `toString` is a valid function and not the one from `Object.prototype` use that
    if (hasCustomToString(value)) {
      value = value.toString();
      if (isPrimitive(value)) return value;
    }
    // We have a basic object so we use the position of the object in the collection
    return index;
  }