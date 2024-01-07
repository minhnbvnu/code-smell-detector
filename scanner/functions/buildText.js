function buildText(flatStyle, context) {
  const prefix = 'text-';

  // Currently, an Array<string> may be used for rich text support.  This doesn't
  // work with our expression syntax where arrays of strings are interpreted as
  // call expressions.  To support rich text, we could add a 'strings' operator
  // where all the following arguments would be string values.
  const evaluateValue = stringEvaluator(flatStyle, prefix + 'value', context);
  if (!evaluateValue) {
    return null;
  }

  const evaluateFill = buildFill(flatStyle, prefix, context);

  const evaluateBackgroundFill = buildFill(
    flatStyle,
    prefix + 'background-',
    context,
  );

  const evaluateStroke = buildStroke(flatStyle, prefix, context);

  const evaluateBackgroundStroke = buildStroke(
    flatStyle,
    prefix + 'background-',
    context,
  );

  const evaluateFont = stringEvaluator(flatStyle, prefix + 'font', context);

  const evaluateMaxAngle = numberEvaluator(
    flatStyle,
    prefix + 'max-angle',
    context,
  );

  const evaluateOffsetX = numberEvaluator(
    flatStyle,
    prefix + 'offset-x',
    context,
  );

  const evaluateOffsetY = numberEvaluator(
    flatStyle,
    prefix + 'offset-y',
    context,
  );

  const evaluateOverflow = booleanEvaluator(
    flatStyle,
    prefix + 'overflow',
    context,
  );

  const evaluatePlacement = stringEvaluator(
    flatStyle,
    prefix + 'placement',
    context,
  );

  const evaluateRepeat = numberEvaluator(flatStyle, prefix + 'repeat', context);

  const evaluateScale = sizeLikeEvaluator(flatStyle, prefix + 'scale', context);

  const evaluateRotateWithView = booleanEvaluator(
    flatStyle,
    prefix + 'rotate-with-view',
    context,
  );

  const evaluateRotation = numberEvaluator(
    flatStyle,
    prefix + 'rotation',
    context,
  );

  const evaluateAlign = stringEvaluator(flatStyle, prefix + 'align', context);

  const evaluateJustify = stringEvaluator(
    flatStyle,
    prefix + 'justify',
    context,
  );

  const evaluateBaseline = stringEvaluator(
    flatStyle,
    prefix + 'baseline',
    context,
  );

  const evaluatePadding = numberArrayEvaluator(
    flatStyle,
    prefix + 'padding',
    context,
  );

  const text = new Text({});
  return function (context) {
    text.setText(evaluateValue(context));

    if (evaluateFill) {
      text.setFill(evaluateFill(context));
    }

    if (evaluateBackgroundFill) {
      text.setBackgroundFill(evaluateBackgroundFill(context));
    }

    if (evaluateStroke) {
      text.setStroke(evaluateStroke(context));
    }

    if (evaluateBackgroundStroke) {
      text.setBackgroundStroke(evaluateBackgroundStroke(context));
    }

    if (evaluateFont) {
      text.setFont(evaluateFont(context));
    }

    if (evaluateMaxAngle) {
      text.setMaxAngle(evaluateMaxAngle(context));
    }

    if (evaluateOffsetX) {
      text.setOffsetX(evaluateOffsetX(context));
    }

    if (evaluateOffsetY) {
      text.setOffsetY(evaluateOffsetY(context));
    }

    if (evaluateOverflow) {
      text.setOverflow(evaluateOverflow(context));
    }

    if (evaluatePlacement) {
      const placement = evaluatePlacement(context);
      if (placement !== 'point' && placement !== 'line') {
        throw new Error('Expected point or line for text-placement');
      }
      text.setPlacement(placement);
    }

    if (evaluateRepeat) {
      text.setRepeat(evaluateRepeat(context));
    }

    if (evaluateScale) {
      text.setScale(evaluateScale(context));
    }

    if (evaluateRotateWithView) {
      text.setRotateWithView(evaluateRotateWithView(context));
    }

    if (evaluateRotation) {
      text.setRotation(evaluateRotation(context));
    }

    if (evaluateAlign) {
      const textAlign = evaluateAlign(context);
      if (
        textAlign !== 'left' &&
        textAlign !== 'center' &&
        textAlign !== 'right' &&
        textAlign !== 'end' &&
        textAlign !== 'start'
      ) {
        throw new Error(
          'Expected left, right, center, start, or end for text-align',
        );
      }
      text.setTextAlign(textAlign);
    }

    if (evaluateJustify) {
      const justify = evaluateJustify(context);
      if (justify !== 'left' && justify !== 'right' && justify !== 'center') {
        throw new Error('Expected left, right, or center for text-justify');
      }
      text.setJustify(justify);
    }

    if (evaluateBaseline) {
      const textBaseline = evaluateBaseline(context);
      if (
        textBaseline !== 'bottom' &&
        textBaseline !== 'top' &&
        textBaseline !== 'middle' &&
        textBaseline !== 'alphabetic' &&
        textBaseline !== 'hanging'
      ) {
        throw new Error(
          'Expected bottom, top, middle, alphabetic, or hanging for text-baseline',
        );
      }
      text.setTextBaseline(textBaseline);
    }

    if (evaluatePadding) {
      text.setPadding(evaluatePadding(context));
    }

    return text;
  };
}