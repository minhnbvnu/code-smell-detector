function getColorFromDistanceField(
  distanceField,
  fillColor,
  strokeColor,
  strokeWidth,
  opacity,
) {
  let color = 'vec4(0.)';
  if (fillColor !== null) {
    color = fillColor;
  }
  if (strokeColor !== null && strokeWidth !== null) {
    const strokeFillRatio = `smoothstep(-${strokeWidth} + 0.63, -${strokeWidth} - 0.58, ${distanceField})`;
    color = `mix(${strokeColor}, ${color}, ${strokeFillRatio})`;
  }
  const shapeOpacity = `(1.0 - smoothstep(-0.63, 0.58, ${distanceField}))`;
  let result = `${color} * ${shapeOpacity}`;
  if (opacity !== null) {
    result = `${result} * ${opacity}`;
  }
  return result;
}