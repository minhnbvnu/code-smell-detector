function constructBase(button1 = 'Continue') {

  this.modal = COSAlertWindow.new();

  this.view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, this.modalParams.width, this.modalParams.height));

  this.modal.addAccessoryView(this.view);
  this.modal.setMessageText(this.modalParams.messageText);
  this.modal.addButtonWithTitle(button1);
  this.modal.setInformativeText(this.modalParams.informativeText);
  this.modal.addButtonWithTitle('Cancel');
}