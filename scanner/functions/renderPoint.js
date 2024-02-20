function renderPoint({context, feature, stylesheet, project}) {
  const streamStyles = getStyles(stylesheet, STREAM_STYLES, {});

  // Resolve styles
  const vertices = unflattenVertices(feature.points);
  const colors = feature.colors && unflattenVertices(feature.colors, vertices.length);
  const colorMode = streamStyles.point_color_mode;
  const colorDomain = streamStyles.point_color_domain;
  const radiusPixels = streamStyles.radius_pixels;

  vertices.forEach((vertex, i) => {
    let color;

    switch (colorMode) {
      case 'ELEVATION':
        color = getColor(vertex[2], colorDomain);
        break;

      case 'DISTANCE_TO_VEHICLE':
        color = getColor(new Vector3(vertex[0], vertex[1], vertex[2]).len(), colorDomain);
        break;

      default:
        color = (colors && colors[i]) || streamStyles.fill_color;
    }
    color = getCSSColor(color, streamStyles.opacity);

    // Render to canvas
    context.beginPath();
    context.arc(project(vertex)[0], project(vertex)[1], radiusPixels, 0, Math.PI * 2);
    context.closePath();

    context.fillStyle = color;
    context.fill();
  });
}