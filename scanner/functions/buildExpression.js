function buildExpression(
  encoded,
  type,
  parsingContext,
  compilationContext,
) {
  const expression = parse(encoded, parsingContext, type);
  if (isType(expression.type, NoneType)) {
    throw new Error(`No matching type was found`);
  }
  if (!overlapsType(type, expression.type)) {
    const expected = typeName(type);
    const actual = typeName(expression.type);
    throw new Error(
      `Expected expression to be of type ${expected}, got ${actual}`,
    );
  }
  return compile(expression, type, compilationContext);
}