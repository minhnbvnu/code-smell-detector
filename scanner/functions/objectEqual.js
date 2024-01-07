function objectEqual(leftHandOperand, rightHandOperand, options) {
    var leftHandKeys = getEnumerableKeys(leftHandOperand);
    var rightHandKeys = getEnumerableKeys(rightHandOperand);
    if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
      leftHandKeys.sort();
      rightHandKeys.sort();
      if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
        return false;
      }
      return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
    }

    var leftHandEntries = getIteratorEntries(leftHandOperand);
    var rightHandEntries = getIteratorEntries(rightHandOperand);
    if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
      leftHandEntries.sort();
      rightHandEntries.sort();
      return iterableEqual(leftHandEntries, rightHandEntries, options);
    }

    if (leftHandKeys.length === 0 &&
        leftHandEntries.length === 0 &&
        rightHandKeys.length === 0 &&
        rightHandEntries.length === 0) {
      return true;
    }

    return false;
  }