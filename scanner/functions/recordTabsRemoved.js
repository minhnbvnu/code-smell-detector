function recordTabsRemoved(tabIds, callback) {
  for (var j = 0; j < tabIds.length; j++) {
    var tabId = tabIds[j];
    var idx = indexOfTab(tabId);
    if (idx >= 0) {
      var tab = tabs[idx];
      addClosedTab(tab);
      tabs.splice(idx, 1);
      updateBadgeText();
    } else {
      log("recordTabsRemoved, failed to remove tab", tabId, ", tab not found in open tab list ", tabs);
    }
  }
  if (callback) {
    callback();
  }
}