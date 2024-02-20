function trackLastSavedChanges(state, action) {
  switch (action.type) {
    case PROJECT_CREATE:
    case PROJECT_OPEN:
    case PROJECT_IMPORT:
    case PROJECT_OPEN_WORKSPACE: {
      return updateLastSavedProject(state);
    }
    case SAVE_ALL: {
      if (R.path(['payload', 'data', 'updateLastSavedProject'], action)) {
        return updateLastSavedProject(state);
      }
      return state;
    }

    default:
      return state;
  }
}