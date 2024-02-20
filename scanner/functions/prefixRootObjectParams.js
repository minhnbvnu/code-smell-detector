function prefixRootObjectParams() {
  this.coeffCurrentHeight++;
  const yAxis = this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight + this.adjust

  const prefixRootObjectParamsLabel = utils.createLabel('Add Prefix ', 0, yAxis, this.marginLeftColRight, 20);
  this.view.addSubview(prefixRootObjectParamsLabel);
  const sizeBox = NSTextField.alloc().initWithFrame(
    NSMakeRect(this.marginLeftColRight, yAxis, 145, 21)
  );

  if (settingsProvider.hasValue(this.settingsValues.prefixRootObject)) {
    sizeBox.setStringValue(String(this.settingsValues.prefixRootObject.value));
  } else {
    sizeBox.setPlaceholderString(String(this.settingsValues.prefixRootObject.placeholder));
  }

  this.view.addSubview(sizeBox);

  this.coeffCurrentHeight++;
  addDescription.call(this, 'Add a path structure to the name of yours icons.', this.lineOne)
  addDescription.call(this, '$size is equal to the size of the artboard.', this.lineTwo)

  this.prefixRootObject = sizeBox;
}