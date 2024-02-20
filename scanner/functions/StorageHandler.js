function StorageHandler(options) {
  this.warn = new Warn({});
  this.storage = new CookieStorage(options);

  if (options.__tryLocalStorageFirst !== true) {
    return;
  }

  try {
    // some browsers throw an error when trying to access localStorage
    // when localStorage is disabled.
    var localStorage = windowHandler.getWindow().localStorage;
    if (localStorage) {
      this.storage = localStorage;
    }
  } catch (e) {
    this.warn.warning(e);
    this.warn.warning("Can't use localStorage. Using CookieStorage instead.");
  }
}