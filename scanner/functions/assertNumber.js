function assertNumber(val, type) {
    if (val === void 0) {
      return;
    } else if (typeof val !== "number") {
      warn(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
    } else if (isNaN(val)) {
      warn(`${type} is NaN - the duration expression might be incorrect.`);
    }
  }