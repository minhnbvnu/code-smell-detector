function allBookmarks(callback) {
  chrome.bookmarks.getTree(function(tree) {
    bookmarks = traverseTree(tree[0]);
    callback(bookmarks);
  })
}