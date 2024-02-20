function addListenerOnMaskCheckbox() {


  this.checkboxMaskParams.setCOSJSTargetFunction((mask) => {
    if (mask.state()) {
      setEnabledRadioButton.call(this, true)
      setEnabledColorLibraryMenu.call(this, true)
      if (this.colorsMenuParams.numberOfItems() > 0) setEnabledColorMenu.call(this, true)
    } else {
      setEnabledRadioButton.call(this, false)
      setEnabledColorLibraryMenu.call(this, false)
      setEnabledColorMenu.call(this, false)
      addLibraryColorsFields.call(this)
      removePickerButton.call(this)
      this.radioParams.cells()[0].state = true
      this.radioParams.cells()[1].state = false
      this.radioParams.cells()[2].state = false
    }
  });
}