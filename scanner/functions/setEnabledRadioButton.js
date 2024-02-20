function setEnabledRadioButton(enabled) {
  this.radioParams.setEnabled(enabled)
  this.radioButtonLabel.setTextColor(getStateColor(enabled))
}