function _updateAlert(state, navigatorUID, newState) {
  return {
    ...state,
    alerts: {
      ...state.alerts,
      [navigatorUID]: newState,
    },
  };
}