function indexOfTab(tabId) {
  for (var i = 0; i < tabs.length; i++) {
    if (tabId === tabs[i].id) {
      return i;
    }
  }
  return -1;
}