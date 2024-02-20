function getLocalBindingMetadata(identName, state) {
  return state.localScope.identifiers[identName];
}