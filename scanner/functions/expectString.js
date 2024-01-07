function expectString(obj) {
    if (!(0, _util.isString)(obj)) {
      throw new _util.FormatError("Malformed CMap: expected string.");
    }
  }