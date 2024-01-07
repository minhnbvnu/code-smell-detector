function deepEqual(leftHandOperand, rightHandOperand, options) {
    // If we have a comparator, we can't assume anything; so bail to its check first.
    if (options && options.comparator) {
      return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
    }

    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      return simpleResult;
    }

    // Deeper comparisons are pushed through to a larger function
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }