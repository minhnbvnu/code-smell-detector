function makeSymbolParams() {

  this.coeffCurrentHeight++

  const maskCheckboxLabel = utils.createLabel('Symbols', 0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 150, 20)
  this.view.addSubview(maskCheckboxLabel)

  const symbolCheckBox = NSButton.alloc().initWithFrame(NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 200, 20));
  symbolCheckBox.setButtonType(NSSwitchButton);
  symbolCheckBox.setState(true);
  symbolCheckBox.setFont(NSFont.systemFontOfSize_(13));
  symbolCheckBox.setTitle('Convert to symbol')
  this.view.addSubview(symbolCheckBox);

  this.symbolParams = symbolCheckBox
}