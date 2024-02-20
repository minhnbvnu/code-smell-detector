function loadFiltered(filters = {}) {
  return transactionsDB()
    .allDocs({
      include_docs: true,
      descending: true,
      startkey: filters.date ? `T${filters.date.end}-\uffff` : 'T\uffff',
      endkey: filters.date ? `T${filters.date.start}-` : 'T'
    })
    .then(response => response.rows.map(row => row.doc))
    .then(docs => filterByAccount(docs, filters.accounts))
    .then(docs => filterByTags(docs, filters.tags))
    .then(docs => docs.map(doc => storageToState(doc)));
}