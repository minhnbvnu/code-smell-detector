function simpleEqual(leftHandOperand, rightHandOperand) {
    // Equal references (except for Numbers) can be returned early
    if (leftHandOperand === rightHandOperand) {
      // Handle +-0 cases
      return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
    }

    // handle NaN cases
    if (
      leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
      rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
    ) {
      return true;
    }

    // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
    // strings, and undefined, can be compared by reference.
    if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      // Easy out b/c it would have passed the first equality check
      return false;
    }
    return null;
  }