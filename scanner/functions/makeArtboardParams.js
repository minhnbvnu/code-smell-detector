function makeArtboardParams() {

  this.coeffCurrentHeight++

  const textBoxLabel = utils.createLabel('Artboard Size', 0, this.modalParams.height - this.modalParams.lineHeight, 150, 20)
  this.view.addSubview(textBoxLabel)
  const textBox = NSTextField.alloc().initWithFrame(NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight, 50, 20));
  textBox.setStringValue(24);
  this.view.addSubview(textBox)
  const textBoxUnit = utils.createLabel('px', 205, this.modalParams.height - this.modalParams.lineHeight, 50, 20)
  this.view.addSubview(textBoxUnit)

  this.coeffCurrentHeight++

  const paddingBoxLabel = utils.createLabel('Artboard Padding', 0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight, 150, 20)
  this.view.addSubview(paddingBoxLabel)
  const paddingBox = NSTextField.alloc().initWithFrame(NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight, 50, 20));
  paddingBox.setStringValue(0);
  this.view.addSubview(paddingBox)
  const paddingBoxUnit = utils.createLabel('px', 205, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight, 50, 20)
  this.view.addSubview(paddingBoxUnit)

  this.artboardPadding = paddingBox
  this.artboardSize = textBox

  this.artboardSize.setNextKeyView(this.artboardPadding)
}