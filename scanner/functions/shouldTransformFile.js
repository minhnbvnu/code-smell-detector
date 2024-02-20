function shouldTransformFile(state, pragmas) {
  if (state.g.typechecks === undefined) {
    initializeSettings(state, pragmas);
  }
  return !state.g.staticOnly && state.g.typechecks;
}