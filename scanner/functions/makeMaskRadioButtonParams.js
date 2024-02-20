function makeMaskRadioButtonParams(context) {

  this.coeffCurrentHeight++;
  this.coeffCurrentHeight++;
  this.coeffCurrentHeight++;

  const radioButtonLabel = utils.createLabel('Color Source', 0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight + 40, 150, 20)
  this.view.addSubview(radioButtonLabel)

  const buttonFormat = NSButtonCell.alloc().init();
  buttonFormat.setButtonType(NSRadioButton);
  const matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 300, 90),
    NSRadioModeMatrix,
    buttonFormat,
    3,
    1
  );
  matrixFormat.setCellSize(CGSizeMake(300, 25));
  const cells = matrixFormat.cells();
  cells[0].setTitle("From Shared Style");
  cells[0].setFont(NSFont.systemFontOfSize_(13));
  cells[1].setTitle("From Symbol");
  cells[1].setFont(NSFont.systemFontOfSize_(13));
  cells[2].setTitle("From Color picker");
  cells[2].setFont(NSFont.systemFontOfSize_(13));

  this.view.addSubview(matrixFormat);

  setListenerRadioButon.call(this, cells, context)

  this.radioParams = matrixFormat
  this.radioButtonLabel = radioButtonLabel
}