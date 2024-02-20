function setEnabledColorMenu(enabled) {
  this.colorsMenuParamsLabel.setTextColor(getStateColor(enabled))
  this.colorsMenuParams.setEnabled(enabled)
}