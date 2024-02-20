function tapIgnoreEvent(e) {
  if (e.isTapHandled) return true;
  e.isTapHandled = true;

  if(ionic.tap.isElementTapDisabled(e.target)) {
    return true;
  }

  if(e.target.tagName == 'SELECT') {
    return true;
  }

  if (ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target)) {
    e.preventDefault();
    return true;
  }
}