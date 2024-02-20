function artboardModal(context) {
  this.settingsValues = settingsProvider.getSettings(context, 'placeholder')

  this.modalParams = {
    messageText: 'Configure your icons',
    informativeText: 'Your icons will be moved in artboards. Set size and padding of your artboards.',
    height: 100,
    width: 300,
    lineHeight: 35
  }

  this.coeffCurrentHeight = 0
  this.adjustHeight = 0

  constructBase()
  makeArtboardParams()

  return {
    button: this.modal.runModal(),
    artboardSize: parseInt(this.artboardSize.stringValue()),
    iconPadding: parseInt(this.artboardPadding.stringValue()),
  }
}