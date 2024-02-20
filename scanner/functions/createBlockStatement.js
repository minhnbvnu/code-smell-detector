function createBlockStatement(body) {
    return {
      type: 21,
      body,
      loc: locStub
    };
  }