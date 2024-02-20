function areDownKeys() {
  for (var key in downKeys) {
    if (downKeys[key] === true ) {
      return true;
    }
  }
  return false;
}