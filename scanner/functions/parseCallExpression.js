function parseCallExpression(encoded, context, typeHint) {
  const operator = encoded[0];

  const parser = parsers[operator];
  if (!parser) {
    throw new Error(`Unknown operator: ${operator}`);
  }
  return parser(encoded, context, typeHint);
}