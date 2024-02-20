function windows_setWindowSize(windowId, size) {
  return {
    type: WINDOW_SIZE_CHANGED,
    windowId,
    size
  };
}