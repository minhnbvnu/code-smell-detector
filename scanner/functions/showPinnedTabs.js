function showPinnedTabs() {
  var s = localStorage["show_pinned_tabs"];
  return s ? s === 'true' : true;
}