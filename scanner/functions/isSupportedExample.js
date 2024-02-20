function isSupportedExample(examplePath) {
  for (let i = 0; i < UNSUPPORTED_EXAMPLES.length; i++) {
    if (examplePath.endsWith(UNSUPPORTED_EXAMPLES[i])) {
      return false;
    }
  }
  return true;
}