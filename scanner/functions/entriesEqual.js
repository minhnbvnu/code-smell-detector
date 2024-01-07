function entriesEqual(leftHandOperand, rightHandOperand, options) {
    // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
    if (leftHandOperand.size !== rightHandOperand.size) {
      return false;
    }
    if (leftHandOperand.size === 0) {
      return true;
    }
    var leftHandItems = [];
    var rightHandItems = [];
    leftHandOperand.forEach(function gatherEntries(key, value) {
      leftHandItems.push([ key, value ]);
    });
    rightHandOperand.forEach(function gatherEntries(key, value) {
      rightHandItems.push([ key, value ]);
    });
    return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
  }