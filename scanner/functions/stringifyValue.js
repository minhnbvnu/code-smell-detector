function stringifyValue(value) {
    if (
      Array.isArray(value) ||
      (value && typeof value === "object" && value.constructor === Object)
    ) {
      return JSON.stringify(value);
    }

    return value;
  }