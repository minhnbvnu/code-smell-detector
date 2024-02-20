function getBrowserColor() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").match;

  return isDarkMode ? "dark" : "light";
}