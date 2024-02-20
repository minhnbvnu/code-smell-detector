function createArtboardFields() {

  const textBox = NSTextField.alloc().initWithFrame(NSMakeRect(0, 10, 130, 20));
  textBox.setStringValue('24');

  const textBoxPadding = NSTextField.alloc().initWithFrame(NSMakeRect(140, 10, 130, 20));
  textBoxPadding.setStringValue('3');

  return [{
    item: textBox,
    getter: function () {
      return parseInt(textBox.stringValue())
    },
    name: 'artboardSize',
    label: utils.createLabel('Size', 0, 30, 130, 20)
  }, {
    item: textBoxPadding,
    getter: function () {
      return parseInt(textBoxPadding.stringValue())
    },
    name: 'iconPadding',
    label: utils.createLabel('Padding', 140, 30, 130, 20)
  }]
}