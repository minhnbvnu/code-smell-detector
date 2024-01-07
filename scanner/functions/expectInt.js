function expectInt(obj) {
    if (!Number.isInteger(obj)) {
      throw new _util.FormatError("Malformed CMap: expected int.");
    }
  }