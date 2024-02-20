function tapMouseDown(e) {
  //console.log('mousedown ' + Date.now());
  if (e.isIonicTap || tapIgnoreEvent(e)) return null;

  if (tapEnabledTouchEvents) {
    //console.log('mousedown', 'stop event');
    e.stopPropagation();

    if (!ionic.Platform.isEdge() && (!ionic.tap.isTextInput(e.target) || tapLastTouchTarget !== e.target) &&
      !isSelectOrOption(e.target.tagName) && !e.target.isContentEditable && !ionic.tap.isVideo(e.target)) {
      // If you preventDefault on a text input then you cannot move its text caret/cursor.
      // Allow through only the text input default. However, without preventDefault on an
      // input the 300ms delay can change focus on inputs after the keyboard shows up.
      // The focusin event handles the chance of focus changing after the keyboard shows.
      // Windows Phone - if you preventDefault on a video element then you cannot operate
      // its native controls.
      e.preventDefault();
    }

    return false;
  }

  tapPointerMoved = false;
  tapPointerStart = ionic.tap.pointerCoord(e);

  tapEventListener('mousemove');
  ionic.activator.start(e);
}