function sanitizeTypehint(string) {
  for (var i = 0; i < string.length; i++) {
    if (string[i] != ' ' && string[i] != ':') {
      return string.substring(i);
    }
  }
  return null;
}