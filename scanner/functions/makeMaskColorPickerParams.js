function makeMaskColorPickerParams(context) {

  const colorPickerLabel = utils.createLabel('Color picker', 0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight + 20, 150, 20)

  const pickerView = NSView.alloc().initWithFrame(NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 130, 60));
  pickerView.setWantsLayer(true)
  pickerView.layer().setBackgroundColor(CGColorCreateGenericRGB(1, 1, 1, 1.0))
  pickerView.layer().setBorderColor(CGColorCreateGenericRGB(186 / 255, 186 / 255, 186 / 255, 1))
  pickerView.layer().borderWidth = 1

  const hexLabel = utils.createLabel('#000000', 60, 20, 100, 20)
  pickerView.addSubview(hexLabel)

  const pickerButton = NSButton.alloc().initWithFrame(NSMakeRect(5, 15, 50, 30));
  pickerButton.setButtonType(NSMomentaryChangeButton)
  pickerButton.setImage(utils.getImageByColor(NSColor.colorWithRed_green_blue_alpha(0, 0, 0, 1), {
    width: 40,
    height: 30
  }))

  pickerButton.setBordered(false);

  const main = AMOMain.alloc().init();

  pickerButton.setCOSJSTargetFunction(() => {
    main.openPopover_onView_withWebview(pickerButton, this.view, utils.createWebview(context, pickerButton, (color) => {
      this.colorPickerColor = color
      hexLabel.setStringValue_(`#${color.immutableModelObject().hexValue()}`)
    }))
  })

  pickerView.addSubview(pickerButton)

  this.pickerView = pickerView
  this.colorPickerLabel = colorPickerLabel
}