function removeBookmark(verseKey) {
  return {
    types: [REMOVE_BOOKMARK, REMOVE_BOOKMARK_SUCCESS, REMOVE_BOOKMARK_FAILURE],
    promise: client => client.del(`/onequran/api/v1/bookmarks/${verseKey}.json`),
    verseKey
  };
}