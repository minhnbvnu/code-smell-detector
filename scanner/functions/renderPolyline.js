function renderPolyline({context, feature, stylesheet, project}) {
  const streamStyles = getStyles(stylesheet, STREAM_STYLES, {});
  const objectStyles = getStyles(stylesheet, OBJECT_STYLES, feature);

  // Resolve styles
  const {start, end} = feature;
  let radius = project(feature.radius || objectStyles.radius);
  radius = Math.min(
    Math.max(streamStyles.radius_min_pixels, radius),
    streamStyles.radius_max_pixels
  );
  const fillColor = getCSSColor(objectStyles.fill_color, streamStyles.opacity);

  // Render to canvas
  context.beginPath();
  context.moveTo(project(start)[0], project(start)[1]);
  context.lineTo(project(end)[0], project(end)[1]);

  context.lineCap = 'round';
  context.lineWidth = radius;
  context.strokeStyle = fillColor;
  context.stroke();
}