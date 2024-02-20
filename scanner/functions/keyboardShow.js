function keyboardShow() {

  ionic.keyboard.isOpen = true;
  ionic.keyboard.isOpening = false;

  var details = {
    keyboardHeight: keyboardGetHeight(),
    viewportHeight: keyboardCurrentViewportHeight
  };

  if (keyboardActiveElement) {
    details.target = keyboardActiveElement;

    var elementBounds = keyboardActiveElement.getBoundingClientRect();

    details.elementTop = Math.round(elementBounds.top);
    details.elementBottom = Math.round(elementBounds.bottom);

    details.windowHeight = details.viewportHeight - details.keyboardHeight;
    //console.log("keyboardShow viewportHeight: " + details.viewportHeight +
    //", windowHeight: " + details.windowHeight +
    //", keyboardHeight: " + details.keyboardHeight);

    // figure out if the element is under the keyboard
    details.isElementUnderKeyboard = (details.elementBottom > details.windowHeight);
    //console.log("isUnderKeyboard: " + details.isElementUnderKeyboard);
    //console.log("elementBottom: " + details.elementBottom);

    // send event so the scroll view adjusts
    ionic.trigger('scrollChildIntoView', details, true);
  }

  setTimeout(function(){
    document.body.classList.add(KEYBOARD_OPEN_CSS);
  }, 400);

  return details; //for testing
}