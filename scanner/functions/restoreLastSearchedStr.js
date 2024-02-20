function restoreLastSearchedStr() {
  var s = localStorage["restore_last_searched_str"];
  return s ? s === 'true' : true;
}