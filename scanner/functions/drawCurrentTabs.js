function drawCurrentTabs() {
  /**
   * This seems kinda nasty but it ensures that we are rendering the latest title information for the tabs
   * since this can be updated after pages have loaded
   */
  chrome.tabs.query({}, function(queryResultTabs) {

    // assign the cleaned tabs list back to background.js
    bg.tabs = compareTabArrays(bg.tabs, queryResultTabs);

    // find the current tab so that it can be excluded on the initial tab list rendering
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
      var tabs = bg.tabs;

      if (bg.orderTabsInWindowOrder()) {
        tabs = tabs.slice().sort(function(a, b) {
          // we want to list the current window's tabs first
          // if either compared tab is part of the current window, order it first
          if(a.windowId === tab[0].windowId && b.windowId !== tab[0].windowId) return -1;
          if(a.windowId !== tab[0].windowId && b.windowId === tab[0].windowId) return 1;
          // when ordering tabs from the current window, use the tab index to sort
          if(a.windowId === tab[0].windowId && b.windowId === tab[0].windowId) return a.index - b.index;
          // at this point, neither a nor b are part of the current window
          // order either on windowId if both tabs are in different windows, or
          // on the tab's index if they're part of the same (non-current) window
          return (a.windowId !== b.windowId)? (a.windowId - b.windowId) : (a.index - b.index);
        });
      }

      if (bg.orderTabsByUrl()) {
        tabs = tabs.slice().sort(function (a, b) {
          if (a.url < b.url) {
            return -1
          } else if (a.url === b.url) {
            return 0
          } else {
            return 1
          }
        });
      }

      /**
       * render only the tabs and closed tabs on initial load (hence the empty array [] for bookmarks), the
       * delay is important to work around issues with Chromes extension rendering on the Mac, refs #91, #168
       */
      renderTabsExceptCurrent({
        allTabs: tabs,
        closedTabs: bg.closedTabs
      }, 100);
    });
  });
}