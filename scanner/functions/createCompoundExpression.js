function createCompoundExpression(children, loc = locStub) {
    return {
      type: 8,
      loc,
      children
    };
  }