function checkNumber(value) {
    if (!Number.isFinite(value)) {
      throw new Error("Invalid number ".concat(value));
    }
    return value;
  }