function updateTabOrder(tabId) {
  // Don't update when returning to same tab: e.g. when closing extension popups, developer tools, ...
  if (tabId === tabs[0].id && !tabOrderUpdateFunction) {
    // log("New Tab is already current tab (1st in list): newTabId = ", tabId ," currentTabId = ", tabs[0].id);
    return
  }

  // change the badge color while the tab change timer is active
  chrome.browserAction.setBadgeBackgroundColor(tabTimerBadgeColor);

  if (tabOrderUpdateFunction) {
    // clear current timer
    tabOrderUpdateFunction.cancel();
  }

  // setup a new timer
  tabOrderUpdateFunction = new DelayedFunction(function() { // @TODO instead of DelayedFunction use setTimeout(fx, time)
    var idx = indexOfTab(tabId);
    if (idx >= 0) { // if tab exists in tabs[]
      //log('updating tab order for', tabId, 'index', idx);
      var tab = tabs[idx];
      tabs.splice(idx, 1); // removes tab from old position = idx
      tabs.unshift(tab); // adds tab to new position = beginning
      activeTabsIndex = 0; // sync tabs[] pointer and actual current tab

      // move the tab if required
      if (!moveOnPopupSwitchOnly()) {
        moveTab(tab)
      }
    }
    // reset the badge color
    chrome.browserAction.setBadgeBackgroundColor(debug ? debugBadgeColor : badgeColor);
    tabOrderUpdateFunction.cancel(); // #note big bug. Function was never canceled and hence tabOrderUpdateFunction always true
  }, tabId === skipTabOrderUpdateTimer ? 0 : getTabOrderUpdateDelay());

  // clear the skip var
  skipTabOrderUpdateTimer = null;
}