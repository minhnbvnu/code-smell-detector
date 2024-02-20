function keyboardFocusIn(e) {
  clearTimeout(keyboardFocusOutTimer);
  //console.log("keyboardFocusIn from: " + e.type + " at: " + Date.now());

  if (!e.target ||
      e.target.readOnly ||
      !ionic.tap.isKeyboardElement(e.target) ||
      !(scrollView = ionic.DomUtil.getParentWithClass(e.target, SCROLL_CONTAINER_CSS))) {
    if (keyboardActiveElement) {
        lastKeyboardActiveElement = keyboardActiveElement;
    }
    keyboardActiveElement = null;
    return;
  }

  keyboardActiveElement = e.target;

  // if using JS scrolling, undo the effects of native overflow scroll so the
  // scroll view is positioned correctly
  if (!scrollView.classList.contains("overflow-scroll")) {
    document.body.scrollTop = 0;
    scrollView.scrollTop = 0;
    ionic.requestAnimationFrame(function(){
      document.body.scrollTop = 0;
      scrollView.scrollTop = 0;
    });

    // any showing part of the document that isn't within the scroll the user
    // could touchmove and cause some ugly changes to the app, so disable
    // any touchmove events while the keyboard is open using e.preventDefault()
    if (window.navigator.msPointerEnabled) {
      document.addEventListener("MSPointerMove", keyboardPreventDefault, false);
    } else {
      document.addEventListener('touchmove', keyboardPreventDefault, false);
    }
  }

  if (!ionic.keyboard.isOpen || ionic.keyboard.isClosing) {
    ionic.keyboard.isOpening = true;
    ionic.keyboard.isClosing = false;
  }

  // attempt to prevent browser from natively scrolling input into view while
  // we are trying to do the same (while we are scrolling) if the user taps the
  // keyboard
  document.addEventListener('keydown', keyboardOnKeyDown, false);



  // if we aren't using the plugin and the keyboard isn't open yet, wait for the
  // window to resize so we can get an accurate estimate of the keyboard size,
  // otherwise we do nothing and let nativeShow call keyboardShow once we have
  // an exact keyboard height
  // if the keyboard is already open, go ahead and scroll the input into view
  // if necessary
  if (!ionic.keyboard.isOpen && !keyboardHasPlugin()) {
    keyboardWaitForResize(keyboardShow, true);

  } else if (ionic.keyboard.isOpen) {
    keyboardShow();
  }
}