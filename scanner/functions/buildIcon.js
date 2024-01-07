function buildIcon(flatStyle, context) {
  const prefix = 'icon-';

  // required property
  const srcName = prefix + 'src';
  const src = requireString(flatStyle[srcName], srcName);

  // settable properties
  const evaluateAnchor = coordinateEvaluator(
    flatStyle,
    prefix + 'anchor',
    context,
  );

  const evaluateScale = sizeLikeEvaluator(flatStyle, prefix + 'scale', context);

  const evaluateOpacity = numberEvaluator(
    flatStyle,
    prefix + 'opacity',
    context,
  );

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

  // the remaining symbolizer properties are not currently settable
  const anchorOrigin = optionalIconOrigin(flatStyle, prefix + 'anchor-origin');
  const anchorXUnits = optionalIconAnchorUnits(
    flatStyle,
    prefix + 'anchor-x-units',
  );
  const anchorYUnits = optionalIconAnchorUnits(
    flatStyle,
    prefix + 'anchor-y-units',
  );
  const color = optionalColorLike(flatStyle, prefix + 'color');
  const crossOrigin = optionalString(flatStyle, prefix + 'cross-origin');
  const offset = optionalNumberArray(flatStyle, prefix + 'offset');
  const offsetOrigin = optionalIconOrigin(flatStyle, prefix + 'offset-origin');
  const width = optionalNumber(flatStyle, prefix + 'width');
  const height = optionalNumber(flatStyle, prefix + 'height');
  const size = optionalSize(flatStyle, prefix + 'size');
  const declutterMode = optionalDeclutterMode(
    flatStyle,
    prefix + 'declutter-mode',
  );

  const icon = new Icon({
    src,
    anchorOrigin,
    anchorXUnits,
    anchorYUnits,
    color,
    crossOrigin,
    offset,
    offsetOrigin,
    height,
    width,
    size,
    declutterMode,
  });

  return function (context) {
    if (evaluateOpacity) {
      icon.setOpacity(evaluateOpacity(context));
    }

    if (evaluateDisplacement) {
      icon.setDisplacement(evaluateDisplacement(context));
    }

    if (evaluateRotation) {
      icon.setRotation(evaluateRotation(context));
    }

    if (evaluateRotateWithView) {
      icon.setRotateWithView(evaluateRotateWithView(context));
    }

    if (evaluateScale) {
      icon.setScale(evaluateScale(context));
    }

    if (evaluateAnchor) {
      icon.setAnchor(evaluateAnchor(context));
    }
    return icon;
  };
}