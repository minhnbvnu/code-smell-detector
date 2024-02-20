function assertType(value, type, name) {
    var actual = sinon.typeOf(value);
    if (actual !== type) {
      throw new TypeError("Expected type of " + name + " to be " +
        type + ", but was " + actual);
    }
  }