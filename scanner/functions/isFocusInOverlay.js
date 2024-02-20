function isFocusInOverlay(activeOverlayEl) {
  return activeOverlayEl.contains(document.activeElement);
}