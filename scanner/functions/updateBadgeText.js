function updateBadgeText() {
  if (showTabCount()) {
    var val = tabs.filter(tab => validTab(tab) && includeTab(tab)).length;

    chrome.browserAction.setBadgeText({text: val + ""});
  } else {
    chrome.browserAction.setBadgeText({text: ""});
  }
}