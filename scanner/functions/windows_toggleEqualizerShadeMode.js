function windows_toggleEqualizerShadeMode() {
  return withWindowGraphIntegrity({
    type: TOGGLE_WINDOW_SHADE_MODE,
    windowId: "equalizer"
  });
}