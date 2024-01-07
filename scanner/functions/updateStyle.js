function updateStyle() {
  iconStyle
    .getImage()
    .setRotation(parseFloat(controls['rotation'].value) * Math.PI);

  iconStyle.getImage().setRotateWithView(controls['rotateWithView'].checked);

  iconStyle
    .getImage()
    .setScale([
      parseFloat(controls['scaleX'].value),
      parseFloat(controls['scaleY'].value),
    ]);

  iconStyle
    .getImage()
    .setAnchor([
      parseFloat(controls['anchorX'].value),
      parseFloat(controls['anchorY'].value),
    ]);

  iconStyle
    .getImage()
    .setDisplacement([
      parseFloat(controls['displacementX'].value),
      parseFloat(controls['displacementY'].value),
    ]);

  iconStyle
    .getText()
    .setRotation(parseFloat(controls['textRotation'].value) * Math.PI);

  iconStyle.getText().setRotateWithView(controls['textRotateWithView'].checked);

  iconStyle
    .getText()
    .setScale([
      parseFloat(controls['textScaleX'].value),
      parseFloat(controls['textScaleY'].value),
    ]);

  iconStyle
    .getText()
    .setTextAlign(textAlignments[parseFloat(controls['textAlign'].value)]);

  iconStyle
    .getText()
    .setTextBaseline(textBaselines[parseFloat(controls['textBaseline'].value)]);

  iconStyle.getText().setOffsetX(parseFloat(controls['textOffsetX'].value));
  iconStyle.getText().setOffsetY(parseFloat(controls['textOffsetY'].value));

  iconFeature.changed();
}