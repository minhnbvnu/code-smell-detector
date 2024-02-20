function settingsModal(context) {


  this.settingsValues = settingsProvider.getSettings(context, 'placeholder')

  this.modalParams = {
    messageText: 'Settings',
    informativeText: 'Customize your imports using presets and other features.',
    height: (Object.keys(this.settingsValues).length + 1) * 73,
    width: 340,
    lineHeight: 45
  };

  this.coeffCurrentHeight = 0;
  this.adjustHeight = 0;
  this.marginLeftColRight = 130;
  this.adjust = -5;
  this.lineOne = 15;
  this.lineTwo = 0;

  constructBase.call(this, 'Save');

  makePresetParams.call(this);
  prefixRootObjectParams.call(this)
  quantityIconsByLine.call(this)
  marginBetweenRootObject.call(this)
  convertStrokeToFillParams.call(this)

  return {
    button: this.modal.runModal(),
    presets: String(this.presets.stringValue()).replace(/ /g, ''),
    iconsByLine: parseInt(this.iconsByLine.stringValue()) || null,
    convertStroke: this.convertStroke.state(),
    marginBetweenRootObject: this.marginBetweenRootObject.stringValue().replace(/ /g, ''),
    prefixRootObject: this.prefixRootObject.stringValue()
  };
}