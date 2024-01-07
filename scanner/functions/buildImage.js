function buildImage(flatStyle, context) {
  if ('icon-src' in flatStyle) {
    return buildIcon(flatStyle, context);
  }

  if ('shape-points' in flatStyle) {
    return buildShape(flatStyle, context);
  }

  if ('circle-radius' in flatStyle) {
    return buildCircle(flatStyle, context);
  }

  return null;
}