function setClosedTabsSize(val) {
  localStorage["closed_tabs_size"] = val;
  resizeClosedTabs();
}