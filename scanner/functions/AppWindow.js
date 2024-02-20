function AppWindow(options) {
  this.loadSettings = {
    bootstrapScript: require.resolve('../renderer/main')
  };
  this.loadSettings = _.extend(this.loadSettings, options);

  var windowOpts = {
    webPreferences: {
      subpixelFontScaling: true,
      directWrite: true
    }
  };
  windowOpts = _.extend(windowOpts, this.loadSettings);

  this.window = new BrowserWindow(windowOpts);
  this.handleEvents();
}