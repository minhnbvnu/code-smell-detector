function patternEvaluator(flatStyle, prefix, context) {
  const srcEvaluator = stringEvaluator(
    flatStyle,
    prefix + 'pattern-src',
    context,
  );
  const offsetEvaluator = sizeEvaluator(
    flatStyle,
    prefix + 'pattern-offset',
    context,
  );
  const patternSizeEvaluator = sizeEvaluator(
    flatStyle,
    prefix + 'pattern-size',
    context,
  );
  const colorEvaluator = colorLikeEvaluator(
    flatStyle,
    prefix + 'color',
    context,
  );
  return function (context) {
    return {
      src: srcEvaluator(context),
      offset: offsetEvaluator && offsetEvaluator(context),
      size: patternSizeEvaluator && patternSizeEvaluator(context),
      color: colorEvaluator && colorEvaluator(context),
    };
  };
}