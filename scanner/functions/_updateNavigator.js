function _updateNavigator(state, navigatorUID, newState) {
  return {
    ...state,
    navigators: {
      ...state.navigators,
      [navigatorUID]: newState,
    },
  };
}