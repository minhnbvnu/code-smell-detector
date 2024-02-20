function convertStrokeToFillParams() {

  this.coeffCurrentHeight++;
  const yAxis = this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight + 30

  const convertStrokeCheckboxLabel = utils.createLabel('Stroke to Fill', 0, yAxis, this.marginLeftColRight, 20)
  this.view.addSubview(convertStrokeCheckboxLabel);

  const convertStrokeCheckBox = NSButton.alloc().initWithFrame(
    NSMakeRect(this.marginLeftColRight, yAxis, 200, 21)
  );
  convertStrokeCheckBox.setButtonType(NSSwitchButton);
  convertStrokeCheckBox.setState(parseInt(this.settingsValues.convertStroke.data));
  convertStrokeCheckBox.setFont(NSFont.systemFontOfSize_(13));
  convertStrokeCheckBox.setTitle('Auto-Convert');
  this.view.addSubview(convertStrokeCheckBox);

  this.coeffCurrentHeight++;
  addDescription.call(this, 'This will allow you to add a dynamic color ', this.lineOne + 30)
  addDescription.call(this, 'over your outlined icons.', this.lineTwo + 30)

  this.convertStroke = convertStrokeCheckBox;
}