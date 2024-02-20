function quantityIconsByLine() {
  this.coeffCurrentHeight++;
  const yAxis = this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight + this.adjust

  const iconByLineParamsLabel = utils.createLabel('Icons Grid', 0, yAxis, this.marginLeftColRight, 20);
  this.view.addSubview(iconByLineParamsLabel);
  const sizeBox = NSTextField.alloc().initWithFrame(
    NSMakeRect(this.marginLeftColRight, yAxis, 50, 21)
  );

  if (String(this.settingsValues.iconsByLine.value) === 'null') {
    sizeBox.setPlaceholderString('10')
  } else {
    sizeBox.setStringValue(String(this.settingsValues.iconsByLine.value));
  }

  this.view.addSubview(sizeBox);
  const sizeBoxUnit = utils.createLabel('icons per row', this.marginLeftColRight + 55, yAxis, 100, 20)
  this.view.addSubview(sizeBoxUnit);

  this.coeffCurrentHeight++;
  addDescription.call(this,'Set the number of imported icons per row.', this.lineOne)
  // addDescription('Format: size-padding', this.lineTwo)

  this.iconsByLine = sizeBox;
}