function invariant(check, message, thing) {
  if (!check) {
    throw new Error('[recore] Invariant failed: ' + message + (thing ? " in '".concat(thing, "'") : ''));
  }
}