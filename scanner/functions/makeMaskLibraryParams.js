function makeMaskLibraryParams(context) {

  this.coeffCurrentHeight++

  const colorLibsLabel = utils.createLabel('Document Source', 0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 150, 25)
  this.view.addSubview(colorLibsLabel)
  const colorLibsMenu = NSPopUpButton.alloc().initWithFrame(NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 130, 30));

  this.coeffCurrentHeight++

  const colorMenuLabel = utils.createLabel('Select Color', 0, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 150, 25)
  this.view.addSubview(colorMenuLabel)
  const colorMenu = NSPopUpButton.alloc().initWithFrame(NSMakeRect(150, this.modalParams.height - this.modalParams.lineHeight * this.coeffCurrentHeight - this.adjustHeight, 130, 30));

  this.view.addSubview(colorLibsMenu);
  this.view.addSubview(colorMenu);

  this.colorLibsMenuParams = colorLibsMenu
  this.colorsMenuParams = colorMenu
  this.colorLibsMenuParamsLabel = colorLibsLabel
  this.colorsMenuParamsLabel = colorMenuLabel

  colorLibsMenu.menu = libraries.initLibsSelectList.call(this, context, AppController.sharedInstance().librariesController().availableLibraries(), colorMenu);
}