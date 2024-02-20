function createMaskFields(context, modal, checkboxFields) {

  const colorLibsMenu = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 130, 20));
  const colorMenu = NSPopUpButton.alloc().initWithFrame(NSMakeRect(140, 0, 130, 20));

  colorLibsMenu.setEnabled(false)
  colorMenu.setEnabled(false)

  colorLibsMenu.menu = libraries.initLibsSelectList(AppController.sharedInstance().librariesController().availableLibraries(), colorMenu);

  if (checkboxFields) {
    checkboxFields[1].item.setCOSJSTargetFunction(function (mask) {
      if (mask.state()) {
        colorLibsMenu.setEnabled(true)
        // documentColorMenu.setEnabled(true)
        if (colorMenu.selectedItem()) colorMenu.setEnabled(true)
      } else {
        colorLibsMenu.setEnabled(false)
        colorMenu.setEnabled(false)
        // documentColorMenu.setEnabled(false)
      }
    });
  } else {
    colorLibsMenu.setEnabled(true)
  }

  return [{
    item: colorMenu,
    label: utils.createLabel('Color', 140, 25, 130, 20),
    name: 'color',
    getter: function () {
      let currentItem = this.item.selectedItem()
      return (currentItem) ? currentItem.representedObject() : null
    }
  }, {
    item: colorLibsMenu,
    label: utils.createLabel('Colors Library', 0, 25, 130, 20),
    name: 'colorLib',
    getter: function () {
      let currentItem = this.item.selectedItem()
      return (currentItem) ? currentItem.representedObject() : null
    }
  }
  ]
}