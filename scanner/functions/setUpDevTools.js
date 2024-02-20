function setUpDevTools() {
  // not when debugging in chrome
  if (__DEV__) { // TODO(9123099) Strip `__DEV__ &&`
    if (!window.document && require('Platform').OS === 'ios') {
      var setupDevtools = require('setupDevtools');
      setupDevtools();
    }
  }
}