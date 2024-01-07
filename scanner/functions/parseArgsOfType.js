function parseArgsOfType(argType) {
  return function (encoded, context) {
    const operation = encoded[0];
    const argCount = encoded.length - 1;
    /**
     * @type {Array<Expression>}
     */
    const args = new Array(argCount);
    for (let i = 0; i < argCount; ++i) {
      const expression = parse(encoded[i + 1], context);
      if (!overlapsType(argType, expression.type)) {
        const gotType = typeName(argType);
        const expectedType = typeName(expression.type);
        throw new Error(
          `Unexpected type for argument ${i} of ${operation} operation` +
            `, got ${gotType} but expected ${expectedType}`,
        );
      }
      expression.type &= argType;
      args[i] = expression;
    }
    return args;
  };
}