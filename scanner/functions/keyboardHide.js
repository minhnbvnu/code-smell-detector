function keyboardHide() {
  clearTimeout(keyboardFocusOutTimer);
  //console.log("keyboardHide");

  ionic.keyboard.isOpen = false;
  ionic.keyboard.isClosing = false;

  if (keyboardActiveElement || lastKeyboardActiveElement) {
    ionic.trigger('resetScrollView', {
      target: keyboardActiveElement || lastKeyboardActiveElement
    }, true);
  }

  ionic.requestAnimationFrame(function(){
    document.body.classList.remove(KEYBOARD_OPEN_CSS);
  });

  // the keyboard is gone now, remove the touchmove that disables native scroll
  if (window.navigator.msPointerEnabled) {
    document.removeEventListener("MSPointerMove", keyboardPreventDefault);
  } else {
    document.removeEventListener('touchmove', keyboardPreventDefault);
  }
  document.removeEventListener('keydown', keyboardOnKeyDown);

  if (ionic.Platform.isAndroid()) {
    // on android closing the keyboard with the back/dismiss button won't remove
    // focus and keyboard can re-appear on subsequent taps (like scrolling)
    if (keyboardHasPlugin()) cordova.plugins.Keyboard.close();
    keyboardActiveElement && keyboardActiveElement.blur();
  }

  keyboardActiveElement = null;
  lastKeyboardActiveElement = null;
}