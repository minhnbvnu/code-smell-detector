function isValidPackagePath(input) {
  return !WRONG_PATTERNS.test(input);
}