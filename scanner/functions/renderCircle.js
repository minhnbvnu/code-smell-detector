function renderCircle({context, feature, stylesheet, project}) {
  const streamStyles = getStyles(stylesheet, STREAM_STYLES, {});
  const objectStyles = getStyles(stylesheet, OBJECT_STYLES, feature);

  // Resolve styles
  const center = feature.center;
  let radius = project(feature.radius || objectStyles.radius);
  radius = Math.min(
    Math.max(streamStyles.radius_min_pixels, radius),
    streamStyles.radius_max_pixels
  );
  let strokeWidth = project(objectStyles.stroke_width);
  strokeWidth = Math.min(
    Math.max(streamStyles.stroke_width_min_pixels, strokeWidth),
    streamStyles.stroke_width_max_pixels
  );
  const strokeColor = getCSSColor(objectStyles.stroke_color, streamStyles.opacity);
  const fillColor = getCSSColor(objectStyles.fill_color, streamStyles.opacity);

  // Render to canvas
  context.beginPath();
  context.arc(project(center)[0], project(center)[1], radius, 0, Math.PI * 2);
  context.closePath();

  if (streamStyles.filled) {
    context.fillStyle = fillColor;
    context.fill();
  }
  if (streamStyles.stroked) {
    context.lineWidth = strokeWidth;
    context.strokeStyle = strokeColor;
    context.stroke();
  }
}