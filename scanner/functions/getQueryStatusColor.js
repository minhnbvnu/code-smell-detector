function getQueryStatusColor(query, theme) {
  return query.state.isFetching
    ? theme.active
    : isStale(query)
    ? theme.warning
    : theme.success
}