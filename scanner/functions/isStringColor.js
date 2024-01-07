function isStringColor(s) {
  try {
    fromString(s);
    return true;
  } catch (_) {
    return false;
  }
}