function isFullscreenActive() {
  const fullscreenElement = getFullscreenElement();
  return fullscreenElement !== null && fullscreenElement !== undefined;
}