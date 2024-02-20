function createArrayExpression(elements, loc = locStub) {
    return {
      type: 17,
      loc,
      elements
    };
  }