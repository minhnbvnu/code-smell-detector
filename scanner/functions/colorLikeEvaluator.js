function colorLikeEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(
    flatStyle[name],
    ColorType | StringType,
    context,
  );
  return function (context) {
    return requireColorLike(evaluator(context), name);
  };
}