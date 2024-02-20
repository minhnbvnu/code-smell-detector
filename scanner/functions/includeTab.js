function includeTab(tab) {
  return !(!showDevTools() && /chrome-devtools:\/\//.exec(tab.url)) && !(!showPinnedTabs() && tab.pinned);
}