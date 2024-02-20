function splitCombinedOperations(operations) {
    // Two operations can be combined together, trying to find which two
    // operations were concatenated.
    for (var i = operations.length - 1; i > 0; i--) {
      var op1 = operations.substring(0, i), op2 = operations.substring(i);
      if (op1 in OP_MAP && op2 in OP_MAP)
        return [op1, op2]; // operations found
    }
    return null;
  }