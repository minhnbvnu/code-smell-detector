function keyboardHasPlugin() {
  return !!(window.cordova && cordova.plugins && cordova.plugins.Keyboard);
}