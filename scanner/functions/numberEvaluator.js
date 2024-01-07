function numberEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return undefined;
  }
  const evaluator = buildExpression(flatStyle[name], NumberType, context);
  return function (context) {
    return requireNumber(evaluator(context), name);
  };
}