function buildStroke(flatStyle, prefix, context) {
  const evaluateWidth = numberEvaluator(
    flatStyle,
    prefix + 'stroke-width',
    context,
  );

  const evaluateColor = colorLikeEvaluator(
    flatStyle,
    prefix + 'stroke-color',
    context,
  );

  if (!evaluateWidth && !evaluateColor) {
    return null;
  }

  const evaluateLineCap = stringEvaluator(
    flatStyle,
    prefix + 'stroke-line-cap',
    context,
  );

  const evaluateLineJoin = stringEvaluator(
    flatStyle,
    prefix + 'stroke-line-join',
    context,
  );

  const evaluateLineDash = numberArrayEvaluator(
    flatStyle,
    prefix + 'stroke-line-dash',
    context,
  );

  const evaluateLineDashOffset = numberEvaluator(
    flatStyle,
    prefix + 'stroke-line-dash-offset',
    context,
  );

  const evaluateMiterLimit = numberEvaluator(
    flatStyle,
    prefix + 'stroke-miter-limit',
    context,
  );

  const stroke = new Stroke();
  return function (context) {
    if (evaluateColor) {
      const color = evaluateColor(context);
      if (color === 'none') {
        return null;
      }
      stroke.setColor(color);
    }

    if (evaluateWidth) {
      stroke.setWidth(evaluateWidth(context));
    }

    if (evaluateLineCap) {
      const lineCap = evaluateLineCap(context);
      if (lineCap !== 'butt' && lineCap !== 'round' && lineCap !== 'square') {
        throw new Error('Expected butt, round, or square line cap');
      }
      stroke.setLineCap(lineCap);
    }

    if (evaluateLineJoin) {
      const lineJoin = evaluateLineJoin(context);
      if (
        lineJoin !== 'bevel' &&
        lineJoin !== 'round' &&
        lineJoin !== 'miter'
      ) {
        throw new Error('Expected bevel, round, or miter line join');
      }
      stroke.setLineJoin(lineJoin);
    }

    if (evaluateLineDash) {
      stroke.setLineDash(evaluateLineDash(context));
    }

    if (evaluateLineDashOffset) {
      stroke.setLineDashOffset(evaluateLineDashOffset(context));
    }

    if (evaluateMiterLimit) {
      stroke.setMiterLimit(evaluateMiterLimit(context));
    }

    return stroke;
  };
}