function keyboardInitViewportHeight() {
  var viewportHeight = getViewportHeight();
  //console.log("Keyboard init VP: " + viewportHeight + " " + window.innerWidth);
  // can't just use window.innerHeight in case the keyboard is opened immediately
  if ((viewportHeight / window.innerWidth) < 1) {
    ionic.keyboard.isLandscape = true;
  }
  //console.log("ionic.keyboard.isLandscape is: " + ionic.keyboard.isLandscape);

  // initialize or update the current viewport height values
  keyboardCurrentViewportHeight = viewportHeight;
  if (ionic.keyboard.isLandscape && !keyboardLandscapeViewportHeight) {
    keyboardLandscapeViewportHeight = keyboardCurrentViewportHeight;
  } else if (!ionic.keyboard.isLandscape && !keyboardPortraitViewportHeight) {
    keyboardPortraitViewportHeight = keyboardCurrentViewportHeight;
  }
}