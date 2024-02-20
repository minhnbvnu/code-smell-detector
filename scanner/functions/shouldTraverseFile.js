function shouldTraverseFile(state, pragmas) {
  if (state.g.typechecks === undefined) {
    initializeSettings(state, pragmas);
  }
  return state.g.typechecks;
}