function initLibsSelectList(context, libraries, colorMenu) {

  function addListener(item) {
    item.setCOSJSTargetFunction((libraryItem) => {
      updateColorMenu.call(this, libraryItem, colorMenu)
    })
  }

  const colorLibsMenu = NSMenu.alloc().init()
  const currentDocument = NSMenuItem.alloc().init()
  currentDocument.title = 'Current file'
  addListener.call(this, currentDocument)
  colorLibsMenu.addItem(currentDocument)
  libraries.forEach((library) => {
    let item = NSMenuItem.alloc().init()
    item.title = library.name()
    item.representedObject = library
    colorLibsMenu.addItem(item)
    addListener.call(this, item)
  })

  updateColorMenu.call(this, currentDocument, colorMenu)

  return colorLibsMenu
}