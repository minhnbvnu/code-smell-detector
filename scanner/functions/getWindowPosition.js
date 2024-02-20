function getWindowPosition(state) {
  return windowId => state.windows.genWindows[windowId].position;
}