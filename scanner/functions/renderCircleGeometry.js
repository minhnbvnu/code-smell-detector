function renderCircleGeometry(
  builderGroup,
  geometry,
  style,
  feature,
  declutterBuilderGroup,
) {
  const fillStyle = style.getFill();
  const strokeStyle = style.getStroke();
  if (fillStyle || strokeStyle) {
    const circleReplay = builderGroup.getBuilder(style.getZIndex(), 'Circle');
    circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    circleReplay.drawCircle(geometry, feature);
  }
  const textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(
      style.getZIndex(),
      'Text',
    );
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}