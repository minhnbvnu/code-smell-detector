function loadRecent(limit = recentListLimit) {
  return transactionsDB()
    .allDocs({
      include_docs: true,
      descending: true,
      startkey: 'T\uffff',
      endkey: 'T',
      limit
    })
    .then(response => response.rows.map(row => row.doc))
    .then(docs => docs.map(storageToState));
}