function createCacheExpression(index, value, isVNode = false) {
    return {
      type: 20,
      index,
      value,
      isVNode,
      loc: locStub
    };
  }