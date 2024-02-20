function makeMaskCheckboxParams() {

  this.coeffCurrentHeight++

  const maskCheckboxLabel = utils.createLabel('Color', 0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 150, 20)
  this.view.addSubview(maskCheckboxLabel)

  const maskCheckBox = NSButton.alloc().initWithFrame(NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 200, 20));
  maskCheckBox.setButtonType(NSSwitchButton);
  maskCheckBox.setState(false);
  maskCheckBox.setFont(NSFont.systemFontOfSize_(13));
  maskCheckBox.setTitle('Apply color')
  this.view.addSubview(maskCheckBox);

  this.checkboxMaskParams = maskCheckBox
}