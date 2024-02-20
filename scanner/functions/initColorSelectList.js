function initColorSelectList(popColorMenu, colors, colorSource) {

  const menu = NSMenu.alloc().init()

  menu.cancelTracking()

  colors.forEach(function (color) {
    try{
      let item = NSMenuItem.alloc().init()
      item.title = (colorSource === 'sharedStyle') ? color.name() : (color.symbol) ? color.symbol.name() : "";
      let colorRGBA;
      if (colorSource === 'sharedStyle') {
        const item = color.style().hasEnabledFill() ? color.style().fills()[0].color() : color.style().borders()[0].color()
        colorRGBA = NSColor.colorWithRed_green_blue_alpha(item.red(), item.green(), item.blue(), item.alpha())
      } else {
        colorRGBA = (color.color) ? NSColor.colorWithRed_green_blue_alpha(color.color.red(), color.color.green(), color.color.blue(), color.color.alpha()) : NSColor.colorWithRed_green_blue_alpha(color.red(), color.green(), color.blue(), color.alpha())
      }
      item.representedObject = (colorSource === 'sharedStyle') ? color : color.symbol || colorRGBA;
      item.image = utils.getImageByColor(colorRGBA)
      menu.addItem(item)
    }catch (e) {
      console.log('cannot use this style >', color.name());
    }
  })
  popColorMenu.menu = menu
  return popColorMenu
}