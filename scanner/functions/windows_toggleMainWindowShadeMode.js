function windows_toggleMainWindowShadeMode() {
  return withWindowGraphIntegrity({
    type: TOGGLE_WINDOW_SHADE_MODE,
    windowId: "main"
  });
}