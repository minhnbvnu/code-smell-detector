function _encode(key, inArray) {
    // Bad keys like `null`, `object`, `boolean`, 'function', 'symbol' should not be passed here due to prior validation
    if (key === undefined) {
      return null;
    }
    // array, date, number, string, binary (should already have detected "invalid")
    // @ts-expect-error Argument may be ignored
    return types[getKeyType(key)].encode(key, inArray);
  }