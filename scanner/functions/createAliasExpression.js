function createAliasExpression(range, content, offset) {
    return createSimpleExpression(
      content,
      false,
      getInnerRange(range, offset, content.length)
    );
  }