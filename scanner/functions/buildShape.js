function buildShape(flatStyle, context) {
  const prefix = 'shape-';

  // required property
  const pointsName = prefix + 'points';
  const radiusName = prefix + 'radius';
  const points = requireNumber(flatStyle[pointsName], pointsName);
  const radius = requireNumber(flatStyle[radiusName], radiusName);

  // settable properties
  const evaluateFill = buildFill(flatStyle, prefix, context);
  const evaluateStroke = buildStroke(flatStyle, prefix, context);
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
  const radius2 = optionalNumber(flatStyle, prefix + 'radius2');
  const angle = optionalNumber(flatStyle, prefix + 'angle');
  const declutterMode = optionalDeclutterMode(
    flatStyle,
    prefix + 'declutter-mode',
  );

  const shape = new RegularShape({
    points,
    radius,
    radius2,
    angle,
    declutterMode,
  });

  return function (context) {
    if (evaluateFill) {
      shape.setFill(evaluateFill(context));
    }
    if (evaluateStroke) {
      shape.setStroke(evaluateStroke(context));
    }
    if (evaluateDisplacement) {
      shape.setDisplacement(evaluateDisplacement(context));
    }
    if (evaluateRotation) {
      shape.setRotation(evaluateRotation(context));
    }
    if (evaluateRotateWithView) {
      shape.setRotateWithView(evaluateRotateWithView(context));
    }
    if (evaluateScale) {
      shape.setScale(evaluateScale(context));
    }

    return shape;
  };
}