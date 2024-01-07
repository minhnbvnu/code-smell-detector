function compile(expression, returnType, context) {
  // operator
  if (expression instanceof CallExpression) {
    const compiler = compilers[expression.operator];
    if (compiler === undefined) {
      throw new Error(
        `No compiler defined for this operator: ${JSON.stringify(
          expression.operator,
        )}`,
      );
    }
    return compiler(context, expression, returnType);
  }

  if ((expression.type & NumberType) > 0) {
    return numberToGlsl(/** @type {number} */ (expression.value));
  }

  if ((expression.type & BooleanType) > 0) {
    return expression.value.toString();
  }

  if ((expression.type & StringType) > 0) {
    return stringToGlsl(expression.value.toString());
  }

  if ((expression.type & ColorType) > 0) {
    return colorToGlsl(
      /** @type {Array<number> | string} */ (expression.value),
    );
  }

  if ((expression.type & NumberArrayType) > 0) {
    return arrayToGlsl(/** @type {Array<number>} */ (expression.value));
  }

  throw new Error(
    `Unexpected expression ${expression.value} (expected type ${typeName(
      returnType,
    )})`,
  );
}