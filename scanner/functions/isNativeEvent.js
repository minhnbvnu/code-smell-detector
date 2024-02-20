function isNativeEvent(e) {
  if (e && e.nativeEvent && e.target) {
    return true;
  }

  return false;
}