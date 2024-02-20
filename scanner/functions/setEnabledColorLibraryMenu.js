function setEnabledColorLibraryMenu(enabled) {
  const color = (enabled) ? NSColor.controlTextColor() : disabledColor
  this.colorLibsMenuParamsLabel.setTextColor(color)
  this.colorLibsMenuParams.setEnabled(enabled)

}