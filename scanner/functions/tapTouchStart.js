function tapTouchStart(e) {
  //console.log("touchstart " + Date.now());
  if (tapIgnoreEvent(e)) return;

  tapPointerMoved = false;

  tapEnableTouchEvents();
  tapPointerStart = ionic.tap.pointerCoord(e);

  tapEventListener(tapTouchMoveListener);
  ionic.activator.start(e);

  if (ionic.Platform.isIOS() && ionic.tap.isLabelWithTextInput(e.target)) {
    // if the tapped element is a label, which has a child input
    // then preventDefault so iOS doesn't ugly auto scroll to the input
    // but do not prevent default on Android or else you cannot move the text caret
    // and do not prevent default on Android or else no virtual keyboard shows up

    var textInput = tapTargetElement(tapContainingElement(e.target));
    if (textInput !== tapActiveEle) {
      // don't preventDefault on an already focused input or else iOS's text caret isn't usable
      //console.log('Would prevent default here');
      e.preventDefault();
    }
  }
}