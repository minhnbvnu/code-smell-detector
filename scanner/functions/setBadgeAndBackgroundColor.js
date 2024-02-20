function setBadgeAndBackgroundColor(text, color) {
  var _chrome = chrome,
    browserAction = _chrome.browserAction;
  browserAction.setBadgeText({
    text: constants["u" /* EMPTY_STRING */] + text
  });
  browserAction.setBadgeBackgroundColor({
    color: color
  });
}