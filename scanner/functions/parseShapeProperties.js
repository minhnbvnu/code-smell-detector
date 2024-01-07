function parseShapeProperties(
  style,
  builder,
  uniforms,
  vertContext,
  fragContext,
) {
  fragContext.functions['round'] = `float round(float v) {
  return sign(v) * floor(abs(v) + 0.5);
}`;

  // these functions take in screen coordinates in pixels and returns the signed distance field
  // (0 on the boundary, negative inside the polygon, positive outside, values in pixels)
  // inspired by https://github.com/zranger1/PixelblazePatterns/blob/master/Toolkit/sdf2d.md#n-sided-regular-polygon
  fragContext.functions['starDistanceField'] =
    `float starDistanceField(vec2 point, float numPoints, float radius, float radius2, float angle) {
  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle
  float c = cos(startAngle);
  float s = sin(startAngle);
  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);
  float alpha = TWO_PI / numPoints; // the angle of one sector
  float beta = atan(pointRotated.y, pointRotated.x);
  float gamma = round(beta / alpha) * alpha; // angle in sector
  c = cos(-gamma);
  s = sin(-gamma);
  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));
  vec2 tipToPoint = inSector + vec2(-radius, 0.);
  vec2 edgeNormal = vec2(radius2 * sin(alpha * 0.5), -radius2 * cos(alpha * 0.5) + radius);
  return dot(normalize(edgeNormal), tipToPoint);
}`;
  fragContext.functions['regularDistanceField'] =
    `float regularDistanceField(vec2 point, float numPoints, float radius, float angle) {
  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle
  float c = cos(startAngle);
  float s = sin(startAngle);
  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);
  float alpha = TWO_PI / numPoints; // the angle of one sector
  float radiusIn = radius * cos(PI / numPoints);
  float beta = atan(pointRotated.y, pointRotated.x);
  float gamma = round((beta - alpha * 0.5) / alpha) * alpha + alpha * 0.5; // angle in sector from mid
  c = cos(-gamma);
  s = sin(-gamma);
  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));
  return inSector.x - radiusIn;
}`;

  parseCommonSymbolProperties(style, builder, vertContext, 'shape-');

  // OPACITY
  let opacity = null;
  if ('shape-opacity' in style) {
    opacity = expressionToGlsl(fragContext, style['shape-opacity'], NumberType);
  }

  // SCALE
  let currentPoint = 'coordsPx';
  if ('shape-scale' in style) {
    const scale = expressionToGlsl(
      fragContext,
      style['shape-scale'],
      NumberType | NumberArrayType,
    );
    currentPoint = `coordsPx / ${scale}`;
  }

  // FILL COLOR
  let fillColor = null;
  if ('shape-fill-color' in style) {
    fillColor = expressionToGlsl(
      fragContext,
      style['shape-fill-color'],
      ColorType,
    );
  }

  // STROKE COLOR
  let strokeColor = null;
  if ('shape-stroke-color' in style) {
    strokeColor = expressionToGlsl(
      fragContext,
      style['shape-stroke-color'],
      ColorType,
    );
  }

  // STROKE WIDTH
  let strokeWidth = null;
  if ('shape-stroke-width' in style) {
    strokeWidth = expressionToGlsl(
      fragContext,
      style['shape-stroke-width'],
      NumberType,
    );
  }

  // SHAPE TYPE
  const numPoints = expressionToGlsl(
    fragContext,
    style['shape-points'],
    NumberType,
  );
  let angle = '0.';
  if ('shape-angle' in style) {
    angle = expressionToGlsl(fragContext, style['shape-angle'], NumberType);
  }
  let shapeField;
  let radius = expressionToGlsl(fragContext, style['shape-radius'], NumberType);
  if (strokeWidth !== null) {
    radius = `${radius} + ${strokeWidth} * 0.5`;
  }
  if ('shape-radius2' in style) {
    let radius2 = expressionToGlsl(
      fragContext,
      style['shape-radius2'],
      NumberType,
    );
    if (strokeWidth !== null) {
      radius2 = `${radius2} + ${strokeWidth} * 0.5`;
    }
    shapeField = `starDistanceField(${currentPoint}, ${numPoints}, ${radius}, ${radius2}, ${angle})`;
  } else {
    shapeField = `regularDistanceField(${currentPoint}, ${numPoints}, ${radius}, ${angle})`;
  }

  // FINAL COLOR
  const colorExpression = getColorFromDistanceField(
    shapeField,
    fillColor,
    strokeColor,
    strokeWidth,
    opacity,
  );
  builder.setSymbolColorExpression(colorExpression);
}