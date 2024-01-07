function parseImageOffsetProperties(
  style,
  prefix,
  context,
  imageSize,
  sampleSize,
) {
  let offsetExpression = expressionToGlsl(
    context,
    style[`${prefix}offset`],
    NumberArrayType,
  );
  if (`${prefix}offset-origin` in style) {
    switch (style[`${prefix}offset-origin`]) {
      case 'top-right':
        offsetExpression = `vec2(${imageSize}.x, 0.) + ${sampleSize} * vec2(-1., 0.) + ${offsetExpression} * vec2(-1., 1.)`;
        break;
      case 'bottom-left':
        offsetExpression = `vec2(0., ${imageSize}.y) + ${sampleSize} * vec2(0., -1.) + ${offsetExpression} * vec2(1., -1.)`;
        break;
      case 'bottom-right':
        offsetExpression = `${imageSize} - ${sampleSize} - ${offsetExpression}`;
        break;
      default: // pass
    }
  }
  return offsetExpression;
}