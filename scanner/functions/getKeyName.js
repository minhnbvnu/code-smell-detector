function getKeyName (event) {
  var keyName = keycode_dictionary[event.keyCode];
  if (event.shiftKey && keyName !== undefined) {
    // Check for non-alpha characters first, because no idea what toUpperCase will do to those
    if (keycode_shifted_keys[keyName] !== undefined) {
      keyName = keycode_shifted_keys[keyName];
    } else {
      keyName = keyName.toUpperCase();
    }
  }
  return keyName;
}