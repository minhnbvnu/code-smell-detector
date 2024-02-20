function filterByTags(docs, tags) {
  return tags && tags.length > 0
    ? docs.filter(tx => intersection(tx.tags, tags).length > 0)
    : docs;
}