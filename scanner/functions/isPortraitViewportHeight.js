function isPortraitViewportHeight(viewportHeight) {
  return !!(!ionic.keyboard.isLandscape &&
         keyboardPortraitViewportHeight &&
         (Math.abs(keyboardPortraitViewportHeight - viewportHeight) < 2));
}