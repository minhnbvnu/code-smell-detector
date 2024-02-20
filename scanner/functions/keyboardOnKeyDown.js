function keyboardOnKeyDown(e) {
  if (ionic.scroll.isScrolling) {
    keyboardPreventDefault(e);
  }
}