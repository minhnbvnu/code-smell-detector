function createErrorMsg(expected, actual, path) {
  if (path === void 0) {
    path = [];
  }

  return "expected response." + (path.join('.') || '(root)') + " to be " + expected + ", but got " + actual;
}