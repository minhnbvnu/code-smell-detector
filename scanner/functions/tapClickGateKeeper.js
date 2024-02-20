function tapClickGateKeeper(e) {
  //console.log('click ' + Date.now() + ' isIonicTap: ' + (e.isIonicTap ? true : false));
  if (e.target.type == 'submit' && e.detail === 0) {
    // do not prevent click if it came from an "Enter" or "Go" keypress submit
    return null;
  }

  // do not allow through any click events that were not created by ionic.tap
  if ((ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target)) ||
      (!e.isIonicTap && !ionic.tap.requiresNativeClick(e.target))) {
    //console.log('clickPrevent', e.target.tagName);
    e.stopPropagation();

    if (!ionic.tap.isLabelWithTextInput(e.target)) {
      // labels clicks from native should not preventDefault othersize keyboard will not show on input focus
      e.preventDefault();
    }
    return false;
  }
}