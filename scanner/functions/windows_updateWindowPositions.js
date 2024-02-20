function windows_updateWindowPositions(positions, absolute) {
  return {
    type: UPDATE_WINDOW_POSITIONS,
    positions,
    absolute
  };
}