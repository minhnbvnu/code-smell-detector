function togglePlaylistShadeMode() {
  return withWindowGraphIntegrity({
    type: TOGGLE_WINDOW_SHADE_MODE,
    windowId: "playlist"
  });
}