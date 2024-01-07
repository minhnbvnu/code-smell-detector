function assert(assertion, errorMessage) {
  if (!assertion) {
    throw new Error(errorMessage);
  }
}