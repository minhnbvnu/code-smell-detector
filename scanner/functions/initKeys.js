function initKeys() {
  let i;

  // alpha keys
  // @see https://stackoverflow.com/a/43095772/2124254
  for (i = 0; i < 26; i++) {
    // rollupjs considers this a side-effect (for now), so we'll do it
    // in the initKeys function
    keyMap['Key' + String.fromCharCode(i + 65)] = String.fromCharCode(
      i + 97
    );
  }

  // numeric keys
  for (i = 0; i < 10; i++) {
    keyMap['Digit' + i] = keyMap['Numpad' + i] = '' + i;
  }

  window.addEventListener('keydown', keydownEventHandler);
  window.addEventListener('keyup', keyupEventHandler);
  window.addEventListener('blur', blurEventHandler);
}