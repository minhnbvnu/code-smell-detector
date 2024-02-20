function keyboardBrowserFocusIn(e) {
  if( !e.target || e.target.readOnly || !ionic.tap.isTextInput(e.target) || ionic.tap.isDateInput(e.target) || !keyboardIsWithinScroll(e.target) ) return;

  document.addEventListener('keydown', keyboardOnKeyDown, false);

  document.body.scrollTop = 0;
  document.body.querySelector('.scroll-content').scrollTop = 0;

  keyboardActiveElement = e.target;

  keyboardSetShow(e);
}