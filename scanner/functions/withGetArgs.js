function withGetArgs(encoded, context) {
  const arg = parse(encoded[1], context);
  if (!(arg instanceof LiteralExpression)) {
    throw new Error('Expected a literal argument for get operation');
  }
  if (typeof arg.value !== 'string') {
    throw new Error('Expected a string argument for get operation');
  }
  context.properties.add(arg.value);
  if (encoded.length === 3) {
    const hint = parse(encoded[2], context);
    return [arg, hint];
  }
  return [arg];
}