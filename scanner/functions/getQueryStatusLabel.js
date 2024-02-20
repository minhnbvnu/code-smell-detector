function getQueryStatusLabel(query) {
  return query.state.isFetching
    ? 'fetching'
    : !query.observers.length
    ? 'inactive'
    : isStale(query)
    ? 'stale'
    : 'fresh'
}