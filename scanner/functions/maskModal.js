function maskModal(context) {
  this.modalParams = {
    messageText: 'Configure your color mask',
    informativeText: 'Select your library and choose a color to apply as mask. Your layers will all be combined.',
    height: 190,
    width: 300,
    lineHeight: 35
  };

  this.coeffCurrentHeight = 0;
  this.isLibrarySource = true;
  this.adjustHeight = 0;
  this.colorSource = 'sharedStyle';

  constructBase.call(this, 'Continue');
  makeMaskRadioButtonParams.call(this, context);
  makeMaskLibraryParams.call(this, context);
  makeMaskColorPickerParams.call(this, context);

  const result = {
    button: this.modal.runModal()
  };

  if (this.isLibrarySource) {
    let colorMenu = this.colorsMenuParams.selectedItem();
    result.color = (colorMenu) ? this.colorsMenuParams.representedObject() : null;

    let colorLib = this.colorLibsMenuParams.selectedItem();
    result.colorLib = (colorLib) ? this.colorLibsMenuParams.representedObject() : null;

    result.colorSource = this.colorSource;
  } else {
    result.colorPicker = this.colorPickerColor
  }

  return result
}