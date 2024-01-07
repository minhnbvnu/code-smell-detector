function expressionToGlsl(compilationContext, value, expectedType) {
  const parsingContext = newParsingContext();
  parsingContext.style = compilationContext.style;
  return buildExpression(
    value,
    expectedType,
    parsingContext,
    compilationContext,
  );
}