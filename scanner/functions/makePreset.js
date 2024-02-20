function makePreset(preset, yAxis) {

  const presetCheckBox = NSButton.alloc().initWithFrame(NSMakeRect(150, yAxis, 30, 20));
  presetCheckBox.setState(true);
  presetCheckBox.setButtonType(NSSwitchButton);
  presetCheckBox.setFont(NSFont.systemFontOfSize_(13));
  presetCheckBox.setTitle('')

  this.view.addSubview(presetCheckBox)

  const sizeBox = NSTextField.alloc().initWithFrame(NSMakeRect(180, yAxis, 50, 20));
  sizeBox.setStringValue(preset.artboardSize);
  this.view.addSubview(sizeBox)

  const paddingBox = NSTextField.alloc().initWithFrame(NSMakeRect(240, yAxis, 50, 20));
  paddingBox.setStringValue(preset.padding);
  this.view.addSubview(paddingBox)

  const newPreset = { sizeBox, paddingBox, presetCheckBox }

  addListenerPreset(newPreset)

  this.presets.push(newPreset)
}