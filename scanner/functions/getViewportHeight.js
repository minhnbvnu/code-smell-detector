function getViewportHeight() {
  var windowHeight = window.innerHeight;
  //console.log('window.innerHeight is: ' + windowHeight);
  //console.log('kb height is: ' + ionic.keyboard.height);
  //console.log('kb isOpen: ' + ionic.keyboard.isOpen);

  //TODO: add iPad undocked/split kb once kb plugin supports it
  // the keyboard overlays the window on Android fullscreen
  if (!(ionic.Platform.isAndroid() && ionic.Platform.isFullScreen) &&
      (ionic.keyboard.isOpen || ionic.keyboard.isOpening) &&
      !ionic.keyboard.isClosing) {

     return windowHeight + keyboardGetHeight();
  }
  return windowHeight;
}