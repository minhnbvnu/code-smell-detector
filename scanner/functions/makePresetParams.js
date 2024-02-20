function makePresetParams() {
  this.coeffCurrentHeight++;
  let yAxis = this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight + this.adjust

  const textBoxLabel = utils.createLabel('Size Presets', 0, yAxis, this.marginLeftColRight, 20);
  this.view.addSubview(textBoxLabel);

  const presetsBox = NSTextField.alloc().initWithFrame(
    NSMakeRect(this.marginLeftColRight, yAxis, 145, 21)
  );

  if (settingsProvider.hasValue(this.settingsValues.presets)) {
    presetsBox.setStringValue(String(this.settingsValues.presets.value));
  } else {
    presetsBox.setPlaceholderString(String(this.settingsValues.presets.placeholder));
  }

  this.view.addSubview(presetsBox);

  this.coeffCurrentHeight++;
  addDescription.call(this, 'Set your artboard sizes and padding.', this.lineOne)
  addDescription.call(this, 'Format: size-padding', this.lineTwo)

  this.presets = presetsBox

}