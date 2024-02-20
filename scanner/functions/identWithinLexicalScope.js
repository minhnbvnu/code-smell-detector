function identWithinLexicalScope(identName, state, stopBeforeNode) {
  var currScope = state.localScope;
  while (currScope) {
    if (currScope.identifiers[identName] !== undefined) {
      return true;
    }

    if (stopBeforeNode && currScope.parentNode === stopBeforeNode) {
      break;
    }

    currScope = currScope.parentScope;
  }
  return false;
}