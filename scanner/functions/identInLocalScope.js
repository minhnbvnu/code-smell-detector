function identInLocalScope(identName, state) {
  return state.localScope.identifiers[identName] !== undefined;
}