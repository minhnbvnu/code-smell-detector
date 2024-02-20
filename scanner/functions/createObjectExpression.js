function createObjectExpression(properties, loc = locStub) {
    return {
      type: 15,
      loc,
      properties
    };
  }