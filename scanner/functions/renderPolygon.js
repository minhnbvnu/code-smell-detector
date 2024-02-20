function renderPolygon({context, feature, stylesheet, project}) {
  const streamStyles = getStyles(stylesheet, STREAM_STYLES, {});
  const objectStyles = getStyles(stylesheet, OBJECT_STYLES, feature);

  // Resolve styles
  const vertices = unflattenVertices(feature.vertices);
  let strokeWidth = project(objectStyles.stroke_width);
  strokeWidth = Math.min(
    Math.max(streamStyles.stroke_width_min_pixels, strokeWidth),
    streamStyles.stroke_width_max_pixels
  );
  const strokeColor = getCSSColor(objectStyles.stroke_color, streamStyles.opacity);
  const fillColor = getCSSColor(objectStyles.fill_color, streamStyles.opacity);

  // Render to canvas
  context.beginPath();
  for (let i = 0; i < vertices.length; i++) {
    const p = project(vertices[i]);
    if (i === 0) {
      context.moveTo(p[0], p[1]);
    } else {
      context.lineTo(p[0], p[1]);
    }
  }
  context.closePath();

  if (streamStyles.stroked) {
    context.lineWidth = strokeWidth;
    context.strokeStyle = strokeColor;
    context.stroke();
  }
  if (streamStyles.filled) {
    context.fillStyle = fillColor;
    context.fill();
  }
}