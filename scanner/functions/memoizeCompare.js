function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
    // Technically, WeakMap keys can *only* be objects, not primitives.
    if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      return null;
    }
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
      var result = leftHandMap.get(rightHandOperand);
      if (typeof result === 'boolean') {
        return result;
      }
    }
    return null;
  }