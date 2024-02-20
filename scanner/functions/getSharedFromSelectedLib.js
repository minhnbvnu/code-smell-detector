function getSharedFromSelectedLib(library, colorMenu) {

  colorMenu.removeAllItems()
  library = library.representedObject()

  return getSharedStylesFromDocument(library.document())
}