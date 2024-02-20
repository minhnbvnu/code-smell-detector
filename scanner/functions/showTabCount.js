function showTabCount() {
  var s = localStorage["show_tab_count"];
  return s ? s === 'true' : true;
}