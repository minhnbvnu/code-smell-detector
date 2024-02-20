function addBookmark(verseKey) {
  return {
    types: [ADD_BOOKMARK, ADD_BOOKMARK_SUCCESS, ADD_BOOKMARK_FAILURE],
    promise: client => client.post('/onequran/api/v1/bookmarks.json', {
      data: {
        bookmark: { verseKey }
      }
    }),
    verseKey
  };
}