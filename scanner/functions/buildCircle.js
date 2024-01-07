function buildCircle(flatStyle, context) {
  const prefix = 'circle-';

  // settable properties
  const evaluateFill = buildFill(flatStyle, prefix, context);
  const evaluateStroke = buildStroke(flatStyle, prefix, context);
  const evaluateRadius = numberEvaluator(flatStyle, prefix + 'radius', context);
  const evaluateScale = sizeLikeEvaluator(flatStyle, prefix + 'scale', context);
  const evaluateDisplacement = coordinateEvaluator(
    flatStyle,
    prefix + 'displacement',
    context,
  );
  const evaluateRotation = numberEvaluator(
    flatStyle,
    prefix + 'rotation',
    context,
  );
  const evaluateRotateWithView = booleanEvaluator(
    flatStyle,
    prefix + 'rotate-with-view',
    context,
  );

  // the remaining properties are not currently settable
  const declutterMode = optionalDeclutterMode(
    flatStyle,
    prefix + 'declutter-mode',
  );

  const circle = new Circle({
    radius: 5, // this is arbitrary, but required - the evaluated radius is used below
    declutterMode,
  });

  return function (context) {
    if (evaluateRadius) {
      circle.setRadius(evaluateRadius(context));
    }
    if (evaluateFill) {
      circle.setFill(evaluateFill(context));
    }
    if (evaluateStroke) {
      circle.setStroke(evaluateStroke(context));
    }
    if (evaluateDisplacement) {
      circle.setDisplacement(evaluateDisplacement(context));
    }
    if (evaluateRotation) {
      circle.setRotation(evaluateRotation(context));
    }
    if (evaluateRotateWithView) {
      circle.setRotateWithView(evaluateRotateWithView(context));
    }
    if (evaluateScale) {
      circle.setScale(evaluateScale(context));
    }

    return circle;
  };
}