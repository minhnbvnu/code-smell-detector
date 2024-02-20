function mayHaveChildren(value) {
    return isRef(value) || isDict(value) || isArray(value) || isStream(value);
  }