function removeClosedTab(url) {
  var idx = indexOfTabByUrl(closedTabs, url);
  if (idx >= 0) {
    closedTabs.splice(idx, 1);
    saveClosedTabs();
  }
}