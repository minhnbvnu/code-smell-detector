function makePresetsParams() {
  const presets = this.settingsValues.presets.data.split(',').map(preset => {
    const properties = preset.split('-')
    return {
      artboardSize: properties[0],
      padding: (properties[1]) ? properties[1] : 0
    }
  })

  this.presets = []

  const presetLabel = utils.createLabel(`Presets`, 0, this.modalParams.height - this.modalParams.lineHeight, 150, 20)
  this.view.addSubview(presetLabel)

  const sizeLabel = utils.createLabel(`Size`, 180, this.modalParams.height - this.modalParams.lineHeight, 100, 20)
  this.view.addSubview(sizeLabel)

  const paddingLabel = utils.createLabel(`Padding`, 240, this.modalParams.height - this.modalParams.lineHeight, 100, 20)
  this.view.addSubview(paddingLabel)

  this.coeffCurrentHeight++

  presets.forEach((preset) => {
    this.coeffCurrentHeight++
    makePreset.call(this, preset, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight, this)
  })
}