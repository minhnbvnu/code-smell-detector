constructor(template, atomWindow) {
    this.atomWindow = atomWindow;
    this.createClickHandlers(template);
    const menu = Menu.buildFromTemplate(template);
    menu.popup(this.atomWindow.browserWindow, { async: true });
  }