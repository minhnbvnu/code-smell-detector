function isLandscapeViewportHeight(viewportHeight) {
  return !!(ionic.keyboard.isLandscape &&
         keyboardLandscapeViewportHeight &&
         (Math.abs(keyboardLandscapeViewportHeight - viewportHeight) < 2));
}