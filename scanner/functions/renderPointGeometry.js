function renderPointGeometry(
  builderGroup,
  geometry,
  style,
  feature,
  declutterBuilderGroup,
) {
  const imageStyle = style.getImage();
  const textStyle = style.getText();
  /** @type {import("../render/canvas.js").DeclutterImageWithText} */
  let declutterImageWithText;
  if (imageStyle) {
    if (imageStyle.getImageState() != ImageState.LOADED) {
      return;
    }
    let imageBuilderGroup = builderGroup;
    if (declutterBuilderGroup) {
      const declutterMode = imageStyle.getDeclutterMode();
      if (declutterMode !== 'none') {
        imageBuilderGroup = declutterBuilderGroup;
        if (declutterMode === 'obstacle') {
          // draw in non-declutter group:
          const imageReplay = builderGroup.getBuilder(
            style.getZIndex(),
            'Image',
          );
          imageReplay.setImageStyle(imageStyle, declutterImageWithText);
          imageReplay.drawPoint(geometry, feature);
        } else if (textStyle && textStyle.getText()) {
          declutterImageWithText = {};
        }
      }
    }
    const imageReplay = imageBuilderGroup.getBuilder(
      style.getZIndex(),
      'Image',
    );
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawPoint(geometry, feature);
  }
  if (textStyle && textStyle.getText()) {
    let textBuilderGroup = builderGroup;
    if (declutterBuilderGroup) {
      textBuilderGroup = declutterBuilderGroup;
    }
    const textReplay = textBuilderGroup.getBuilder(style.getZIndex(), 'Text');
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}