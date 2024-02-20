function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}