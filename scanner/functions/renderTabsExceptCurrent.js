function renderTabsExceptCurrent(params, delay) {
  chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
    renderTabs(params, delay, tab[0]);
  });
}