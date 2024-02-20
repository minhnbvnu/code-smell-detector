function importModal(context) {
  this.settingsValues = settingsProvider.getSettings(context, 'default');

  this.modalParams = {
    messageText: 'Configure your import',
    informativeText: 'Your icons will be arranged in artboards. Set size and padding of your artboards.',
    width: 300,
    lineHeight: 35
  };

  const usePresets = settingsProvider.hasValue(this.settingsValues.presets)
  this.modalParams.height = settingsProvider.hasValue(this.settingsValues.presets) ? 330 + this.settingsValues.presets.data.split(',').length * 30 : 330

  this.coeffCurrentHeight = 0;
  this.isLibrarySource = true;
  this.adjustHeight = 0;
  this.colorSource = 'sharedStyle';

  constructBase.call(this, 'Continue');
  if (usePresets) {
    makePresetsParams.call(this)
  } else {
    makeArtboardParams.call(this)
  }

  this.view.addSubview(utils.createDivider(NSMakeRect(0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - 10, this.modalParams.width, 1)));
  this.adjustHeight = 5
  makeSymbolParams.call(this)
  this.view.addSubview(utils.createDivider(NSMakeRect(0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - 15, this.modalParams.width, 1)));
  this.adjustHeight = 8
  makeMaskCheckboxParams.call(this)
  makeMaskRadioButtonParams.call(this)
  makeMaskLibraryParams.call(this, context)
  setEnabledColorLibraryMenu.call(this, false)
  setEnabledColorMenu.call(this, false)
  setEnabledRadioButton.call(this, false)
  makeMaskColorPickerParams.call(this, context)
  addListenerOnMaskCheckbox.call(this)

  const result = {
    button: this.modal.runModal(),
    convertSymbol: this.symbolParams.state(),
    withColor: !!this.checkboxMaskParams.state()
  }

  if (usePresets) {
    result.presets = []
    this.presets.forEach(preset => {
      if (preset.presetCheckBox.state()) {
        result.presets.push({
          artboardSize: parseInt(preset.sizeBox.stringValue()),
          iconPadding: parseInt(preset.paddingBox.stringValue())
        })
      }
    })
  } else {
    result.artboardSize = parseInt(this.artboardSize.stringValue())
    result.iconPadding = parseInt(this.artboardPadding.stringValue())
  }

  if (result.withColor && this.isLibrarySource) {
    let colorMenu = this.colorsMenuParams.selectedItem()
    result.color = (colorMenu) ? this.colorsMenuParams.representedObject() : null

    let colorLib = this.colorLibsMenuParams.selectedItem()
    result.colorLib = (colorLib) ? this.colorLibsMenuParams.representedObject() : null

    if (!result.color) result.withColor = false
    result.colorSource = this.colorSource;
  } else if (result.withColor) {
    result.colorPicker = this.colorPickerColor || MSColor.blackColor()
  }
  return result
}