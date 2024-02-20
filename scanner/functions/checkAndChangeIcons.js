function checkAndChangeIcons() {
  var isDarkMode = window.matchMedia(constants["k" /* DARK_MODE_MEDIA */]);
  if (isDarkMode && isDarkMode.matches) {
    chrome.browserAction.setIcon({
      path: constants["f" /* BLUE_ICON_PATH */]
    });
  } else {
    chrome.browserAction.setIcon({
      path: constants["w" /* GREY_ICON_PATH */]
    });
  }
}