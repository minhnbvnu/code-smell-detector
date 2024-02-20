function renderText({context, feature, stylesheet, project}) {
  const streamStyles = getStyles(stylesheet, STREAM_STYLES, {});
  const objectStyles = getStyles(stylesheet, OBJECT_STYLES, feature);

  // Resolve styles
  const {position, text} = feature;
  const fontSize = objectStyles.text_size;
  const rotation = objectStyles.text_rotation;
  const fontFamily = streamStyles.font_family;
  const fontWeight = streamStyles.font_weight;
  const textAnchor = objectStyles.text_anchor;
  const textBaseline = objectStyles.text_baseline;
  const fillColor = getCSSColor(objectStyles.fill_color, streamStyles.opacity);

  // Render to canvas
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  context.textAlign = textAnchor === 'MIDDLE' ? 'center' : textAnchor.toLowerCase();
  context.textBaseline = textBaseline === 'CENTER' ? 'middle' : textBaseline.toLowerCase();
  context.fillStyle = fillColor;

  context.save();
  context.translate(project(position)[0], project(position)[1]);
  context.rotate((-rotation * Math.PI) / 180);
  context.fillText(text, 0, 0);
  context.restore();
}