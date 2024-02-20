function getClosedTabsListSave() {
  var s = localStorage["closed_tabs_list_save"];
  return s ? s === 'true' : true;
}