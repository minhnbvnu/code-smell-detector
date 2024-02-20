function keyboardUpdateViewportHeight() {
  wasOrientationChange = false;
  keyboardCurrentViewportHeight = getViewportHeight();

  if (ionic.keyboard.isLandscape && !keyboardLandscapeViewportHeight) {
    //console.log("saved landscape: " + keyboardCurrentViewportHeight);
    keyboardLandscapeViewportHeight = keyboardCurrentViewportHeight;

  } else if (!ionic.keyboard.isLandscape && !keyboardPortraitViewportHeight) {
    //console.log("saved portrait: " + keyboardCurrentViewportHeight);
    keyboardPortraitViewportHeight = keyboardCurrentViewportHeight;
  }

  if (keyboardActiveElement) {
    ionic.trigger('resetScrollView', {
      target: keyboardActiveElement
    }, true);
  }

  if (ionic.keyboard.isOpen && ionic.tap.isTextInput(keyboardActiveElement)) {
    keyboardShow();
  }
}