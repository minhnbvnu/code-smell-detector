function getEnvType() {
  try {
    return window.STORYBOOK_ENV;
  } catch (e) {
    return null;
  }
}