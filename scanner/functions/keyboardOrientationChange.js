function keyboardOrientationChange() {
  //console.log("orientationchange fired at: " + Date.now());
  //console.log("orientation was: " + (ionic.keyboard.isLandscape ? "landscape" : "portrait"));

  // toggle orientation
  ionic.keyboard.isLandscape = !ionic.keyboard.isLandscape;
  // //console.log("now orientation is: " + (ionic.keyboard.isLandscape ? "landscape" : "portrait"));

  // no need to wait for resizing on iOS, and orientationchange always fires
  // after the keyboard has opened, so it doesn't matter if it's open or not
  if (ionic.Platform.isIOS()) {
    keyboardUpdateViewportHeight();
  }

  // On Android, if the keyboard isn't open or we aren't using the keyboard
  // plugin, update the viewport height once everything has resized. If the
  // keyboard is open and we are using the keyboard plugin do nothing and let
  // nativeShow handle it using an accurate keyboard height.
  if ( ionic.Platform.isAndroid()) {
    if (!ionic.keyboard.isOpen || !keyboardHasPlugin()) {
      keyboardWaitForResize(keyboardUpdateViewportHeight, false);
    } else {
      wasOrientationChange = true;
    }
  }
}