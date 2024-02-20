function addListenerPreset(newPreset) {
  newPreset.presetCheckBox.setCOSJSTargetFunction(() => {
    newPreset.sizeBox.setEnabled(newPreset.presetCheckBox.state())
    newPreset.paddingBox.setEnabled(newPreset.presetCheckBox.state())

  })
}