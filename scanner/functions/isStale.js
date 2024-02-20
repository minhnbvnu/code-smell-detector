function isStale(query) {
  return typeof query.isStale === 'function'
    ? query.isStale()
    : query.state.isStale
}