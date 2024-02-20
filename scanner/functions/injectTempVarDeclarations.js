function injectTempVarDeclarations(state, index) {
  if (state.localScope.tempVars.length) {
    state.g.buffer =
      state.g.buffer.slice(0, index) +
      'var ' + state.localScope.tempVars.join(', ') + ';' +
      state.g.buffer.slice(index);
    state.localScope.tempVars = [];
  }
}