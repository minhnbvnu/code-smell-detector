function buildFill(flatStyle, prefix, context) {
  let evaluateColor;
  if (prefix + 'fill-pattern-src' in flatStyle) {
    evaluateColor = patternEvaluator(flatStyle, prefix + 'fill-', context);
  } else {
    evaluateColor = colorLikeEvaluator(
      flatStyle,
      prefix + 'fill-color',
      context,
    );
  }
  if (!evaluateColor) {
    return null;
  }

  const fill = new Fill();
  return function (context) {
    const color = evaluateColor(context);
    if (color === 'none') {
      return null;
    }
    fill.setColor(color);
    return fill;
  };
}