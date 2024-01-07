function parseCircleProperties(
  style,
  builder,
  uniforms,
  vertContext,
  fragContext,
) {
  // this function takes in screen coordinates in pixels and returns the signed distance field
  // (0 on the boundary, negative inside the circle, positive outside, values in pixels)
  fragContext.functions['circleDistanceField'] =
    `float circleDistanceField(vec2 point, float radius) {
  return length(point) - radius;
}`;

  parseCommonSymbolProperties(style, builder, vertContext, 'circle-');

  // OPACITY
  let opacity = null;
  if ('circle-opacity' in style) {
    opacity = expressionToGlsl(
      fragContext,
      style['circle-opacity'],
      NumberType,
    );
  }

  // SCALE
  let currentPoint = 'coordsPx';
  if ('circle-scale' in style) {
    const scale = expressionToGlsl(
      fragContext,
      style['circle-scale'],
      NumberType | NumberArrayType,
    );
    currentPoint = `coordsPx / ${scale}`;
  }

  // FILL COLOR
  let fillColor = null;
  if ('circle-fill-color' in style) {
    fillColor = expressionToGlsl(
      fragContext,
      style['circle-fill-color'],
      ColorType,
    );
  }

  // STROKE COLOR
  let strokeColor = null;
  if ('circle-stroke-color' in style) {
    strokeColor = expressionToGlsl(
      fragContext,
      style['circle-stroke-color'],
      ColorType,
    );
  }

  // RADIUS
  let radius = expressionToGlsl(
    fragContext,
    style['circle-radius'],
    NumberType,
  );

  // STROKE WIDTH
  let strokeWidth = null;
  if ('circle-stroke-width' in style) {
    strokeWidth = expressionToGlsl(
      fragContext,
      style['circle-stroke-width'],
      NumberType,
    );
    radius = `(${radius} + ${strokeWidth} * 0.5)`;
  }

  // FINAL COLOR
  const distanceField = `circleDistanceField(${currentPoint}, ${radius})`;
  const colorExpression = getColorFromDistanceField(
    distanceField,
    fillColor,
    strokeColor,
    strokeWidth,
    opacity,
  );
  builder.setSymbolColorExpression(colorExpression);
}