function prompt(state = initialState, action) {
  switch (action.type) {
    case FOLDER_SELECTED:
      state = action.cwd;
      break;
    default:
      return state;
  }
  return state;
}