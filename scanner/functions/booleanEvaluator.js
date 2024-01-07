function booleanEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(flatStyle[name], BooleanType, context);
  return function (context) {
    const value = evaluator(context);
    if (typeof value !== 'boolean') {
      throw new Error(`Expected a boolean for ${name}`);
    }
    return value;
  };
}