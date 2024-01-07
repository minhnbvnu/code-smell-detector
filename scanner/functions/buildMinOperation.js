function buildMinOperation(num1, max) {
    if (num1.min >= max) {
      return new AstLiteral(max);
    } else if (num1.max <= max) {
      return num1;
    }

    return new AstMin(num1, max);
  }