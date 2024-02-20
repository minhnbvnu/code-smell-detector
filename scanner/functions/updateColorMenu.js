function updateColorMenu(libraryItem, colorMenu) {
  let colors = [];

  if (!libraryItem.representedObject()) {
    colors = this.colorSource === 'symbol' ?
      getColorSymbolsFromDocument.call(this, MSDocument.currentDocument().documentData()) :
      getSharedStylesFromDocument.call(this, MSDocument.currentDocument().documentData());
  } else {
    colors = this.colorSource === 'symbol' ?
      loadColorFromSelectedLib.call(this, libraryItem, colorMenu) :
      getSharedFromSelectedLib.call(this, libraryItem, colorMenu)
  }

  if (colors.length > 0) {
    initColorSelectList.call(this, colorMenu, colors, this.colorSource);
    setEnabledColorMenu.call(this, true)
  } else {
    setEnabledColorMenu.call(this, false)
  }
}