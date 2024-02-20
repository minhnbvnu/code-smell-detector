function retrieveParams(subpath) {
  if (E2E) {
    return { command: 'solhint', param1: '', path: '', subpath }
  } else {
    return { command: 'node', param1: 'solhint', path: 'e2e/08-autofix/', subpath }
  }
}