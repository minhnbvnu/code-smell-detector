function normalizeErrorMessage(errorMessage) {
  // Remove Fiber IDs from error message (as those will be unique).
  errorMessage = errorMessage.replace(/"[0-9]+"/, '');
  return errorMessage;
}