function setListenerRadioButon(cells, context) {
  function setState(item) {
    const title = String(item.selectedCells()[0].title());
    if (title === 'From Symbol') {
      addLibraryColorsFields.call(this)
      removePickerButton.call(this)
      this.isLibrarySource = true
      this.colorSource = 'symbol';
      libraries.updateColorMenu.call(this, this.colorLibsMenuParams.selectedItem(), this.colorsMenuParams)
    } else if (title === 'From Color picker') {
      removeLibraryColorsFields.call(this)
      addPickerButton.call(this)
      this.isLibrarySource = false
    } else {
      this.isLibrarySource = true
      addLibraryColorsFields.call(this)
      removePickerButton.call(this)
      this.colorSource = 'sharedStyle';
      libraries.updateColorMenu.call(this, this.colorLibsMenuParams.selectedItem(), this.colorsMenuParams)
    }
  }

  this.context = context;
  cells[0].setCOSJSTargetFunction(setState.bind(this));
  cells[1].setCOSJSTargetFunction(setState.bind(this));
  cells[2].setCOSJSTargetFunction(setState.bind(this));
}