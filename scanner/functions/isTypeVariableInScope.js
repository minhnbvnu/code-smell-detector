function isTypeVariableInScope(id, state) {
  return state.g.typeVariableScopeDepth[id.name] > 0;
}