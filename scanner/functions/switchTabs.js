function switchTabs(tabid) {
  // find the tab
  chrome.tabs.get(tabid, function(tab) {
    // Focus the window before the tab to fix issue #273
    chrome.windows.update(tab.windowId, {focused: true}, function() {
      // focus the tab
      chrome.tabs.update(tabid, {active: true}, function(tab) {
        // // move the tab if required
        log("switched tabs", tabid, tab);
        if (moveOnPopupSwitchOnly()) {
          moveTab(tab);
        }
      });
    });
  });
}