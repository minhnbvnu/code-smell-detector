function splitTabs(tabsToInclude) {
  let head = tabsToInclude[0];
  let tail = tabsToInclude.slice(1);
  chrome.windows.create({
    // create a window
    tabId: head,
    type: "normal",
    focused: true,
  }, function(window) {
    chrome.tabs.move(tail, {
      windowId: window.id,
      index: -1
    });
  });
}