function windows_closeWindow(windowId) {
  return {
    type: CLOSE_WINDOW,
    windowId
  };
}