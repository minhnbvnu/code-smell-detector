function getClosedTabsSize() {
  var s = localStorage["closed_tabs_size"];
  return s ? parseInt(s, 10) || 0 : 10;
}