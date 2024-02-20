function onTabUpdated(tabId, info, tab) {
  if (info.url && tabId in tabInfos) {
    if (getHostname(info.url) != tabInfos[tabId].hostname) {
      delete tabInfos[tabId];
    }
  }

  if (info.status != "complete") {
    return;
  }

  if (tabId in tabInfos) {
    displayOTP(tabId);
  }

  if (tabId in authListeners) {
    chrome.webRequest.onAuthRequired.removeListener(authListeners[tabId]);
    delete authListeners[tabId];
  }
}