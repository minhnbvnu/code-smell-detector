function deopt(path, state) {
  if (!state.confident) return;
  state.deoptPath = path;
  state.confident = false;
}