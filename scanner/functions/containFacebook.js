async function containFacebook (request) {
  if (tabsWaitingToLoad[request.tabId]) {
    // Cleanup just to make sure we don't get a race-condition with startup reopening
    delete tabsWaitingToLoad[request.tabId];
  }

  // Listen to requests and open Facebook into its Container,
  // open other sites into the default tab context
  if (request.tabId === -1) {
    // Request doesn't belong to a tab
    return;
  }

  const tab = await browser.tabs.get(request.tabId);
  updateBrowserActionIcon(tab);

  const url = new URL(request.url);
  const urlSearchParm = new URLSearchParams(url.search);
  if (urlSearchParm.has("fbclid")) {
    return {redirectUrl: stripFbclid(request.url)};
  }

  return maybeReopenTab(request.url, tab, request);
}