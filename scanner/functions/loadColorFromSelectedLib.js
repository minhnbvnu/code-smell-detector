function loadColorFromSelectedLib(library, colorMenu) {

  colorMenu.removeAllItems()
  library = library.representedObject()

  return getColorSymbolsFromDocument(library.document())
}