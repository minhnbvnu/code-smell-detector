function buildStyle(flatStyle, context) {
  const evaluateFill = buildFill(flatStyle, '', context);
  const evaluateStroke = buildStroke(flatStyle, '', context);
  const evaluateText = buildText(flatStyle, context);
  const evaluateImage = buildImage(flatStyle, context);
  const evaluateZIndex = numberEvaluator(flatStyle, 'z-index', context);

  if (
    !evaluateFill &&
    !evaluateStroke &&
    !evaluateText &&
    !evaluateImage &&
    !isEmpty(flatStyle)
  ) {
    // assume this is a user error
    // would be nice to check the properties and suggest "did you mean..."
    throw new Error(
      'No fill, stroke, point, or text symbolizer properties in style: ' +
        JSON.stringify(flatStyle),
    );
  }

  const style = new Style();
  return function (context) {
    let empty = true;
    if (evaluateFill) {
      const fill = evaluateFill(context);
      if (fill) {
        empty = false;
      }
      style.setFill(fill);
    }
    if (evaluateStroke) {
      const stroke = evaluateStroke(context);
      if (stroke) {
        empty = false;
      }
      style.setStroke(stroke);
    }
    if (evaluateText) {
      const text = evaluateText(context);
      if (text) {
        empty = false;
      }
      style.setText(text);
    }
    if (evaluateImage) {
      const image = evaluateImage(context);
      if (image) {
        empty = false;
      }
      style.setImage(image);
    }
    if (evaluateZIndex) {
      style.setZIndex(evaluateZIndex(context));
    }
    if (empty) {
      return null;
    }
    return style;
  };
}