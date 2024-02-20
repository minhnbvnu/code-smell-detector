function enterFullScreen(node) {
  if (fscreen_lib_default.a.fullscreenEnabled) {
    fscreen_lib_default.a.requestFullscreen(node);
  }
}