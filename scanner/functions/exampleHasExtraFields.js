function exampleHasExtraFields(examplePath) {
  for (let i = 0; i < EXTRA_FIELDS_EXAMPLES.length; i++) {
    if (examplePath.endsWith(EXTRA_FIELDS_EXAMPLES[i])) {
      return true;
    }
  }

  return false;
}