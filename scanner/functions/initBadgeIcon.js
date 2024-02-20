function initBadgeIcon() {
  // set the badge colour
  chrome.browserAction.setBadgeBackgroundColor(debug ? debugBadgeColor : badgeColor);
  updateBadgeText();
}