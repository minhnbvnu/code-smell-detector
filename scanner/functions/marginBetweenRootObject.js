function marginBetweenRootObject() {
  this.coeffCurrentHeight++;
  const yAxis = this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight + 15

  const marginBetweenRootObjectParamsLabel = utils.createLabel('Spacing', 0, yAxis, this.marginLeftColRight, 20);
  this.view.addSubview(marginBetweenRootObjectParamsLabel);
  const sizeBox = NSTextField.alloc().initWithFrame(
    NSMakeRect(this.marginLeftColRight, yAxis, 50, 21)
  );

  if (settingsProvider.hasValue(this.settingsValues.marginBetweenRootObject)) {
    sizeBox.setStringValue(String(this.settingsValues.marginBetweenRootObject.value));
  } else {
    sizeBox.setPlaceholderString(String(this.settingsValues.marginBetweenRootObject.placeholder));
  }

  this.view.addSubview(sizeBox);
  const sizeBoxUnit = utils.createLabel('px or %', this.marginLeftColRight + 55, yAxis, 100, 20)
  this.view.addSubview(sizeBoxUnit);

  this.coeffCurrentHeight++;
  addDescription.call(this,'Set the spacing between the imported icons.', this.lineOne + 15)
  // addDescription('Format: size-padding', this.lineTwo)

  this.marginBetweenRootObject = sizeBox;
}