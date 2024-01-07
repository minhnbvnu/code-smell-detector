function createNameStyleFunction(foundStyle, name) {
  const textOffset = [0, 0];
  /** @type {CanvasTextAlign} */
  let textAlign = 'start';
  const imageStyle = foundStyle.getImage();
  if (imageStyle) {
    const imageSize = imageStyle.getSize();
    if (imageSize && imageSize.length == 2) {
      const imageScale = imageStyle.getScaleArray();
      const anchor = imageStyle.getAnchor();
      // Offset the label to be centered to the right of the icon,
      // if there is one.
      textOffset[0] = imageScale[0] * (imageSize[0] - anchor[0]);
      textOffset[1] = imageScale[1] * (imageSize[1] / 2 - anchor[1]);
      textAlign = 'left';
    }
  }
  let textStyle = foundStyle.getText();
  if (textStyle) {
    // clone the text style, customizing it with name, alignments and offset.
    // Note that kml does not support many text options that OpenLayers does (rotation, textBaseline).
    textStyle = textStyle.clone();
    textStyle.setFont(textStyle.getFont() || DEFAULT_TEXT_STYLE.getFont());
    textStyle.setScale(textStyle.getScale() || DEFAULT_TEXT_STYLE.getScale());
    textStyle.setFill(textStyle.getFill() || DEFAULT_TEXT_STYLE.getFill());
    textStyle.setStroke(textStyle.getStroke() || DEFAULT_TEXT_STROKE_STYLE);
  } else {
    textStyle = DEFAULT_TEXT_STYLE.clone();
  }
  textStyle.setText(name);
  textStyle.setOffsetX(textOffset[0]);
  textStyle.setOffsetY(textOffset[1]);
  textStyle.setTextAlign(textAlign);

  const nameStyle = new Style({
    image: imageStyle,
    text: textStyle,
  });
  return nameStyle;
}