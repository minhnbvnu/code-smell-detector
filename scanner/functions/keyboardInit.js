function keyboardInit() {

  if (ionic.keyboard.isInitialized) return;

  if (keyboardHasPlugin()) {
    window.addEventListener('native.keyboardshow', debouncedKeyboardNativeShow);
    window.addEventListener('native.keyboardhide', keyboardFocusOut);
  } else {
    document.body.addEventListener('focusout', keyboardFocusOut);
  }

  document.body.addEventListener('ionic.focusin', debouncedKeyboardFocusIn);
  document.body.addEventListener('focusin', debouncedKeyboardFocusIn);

  if (window.navigator.msPointerEnabled) {
    document.removeEventListener("MSPointerDown", keyboardInit);
  } else {
    document.removeEventListener('touchstart', keyboardInit);
  }

  ionic.keyboard.isInitialized = true;
}