function autoSearchBookmarks() {
  var s = localStorage["auto_search_bookmarks"];
  return s ? s === 'true' : true;
}