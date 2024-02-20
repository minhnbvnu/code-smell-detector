function duplicateFocusedTab() {
  let attr = entryWithFocus().attr('id');
  if (attr) {
    chrome.tabs.duplicate(parseInt(attr), (tab) => {
      closeWindow();
      bg.switchTabsWithoutDelay(tab.id);
    });
  }
}