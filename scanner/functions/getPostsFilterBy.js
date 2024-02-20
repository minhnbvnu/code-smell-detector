async function getPostsFilterBy (filter) {
  const _filtered = await dataFilterBy(filter)
  const ids = _filtered.map(data => data.__id)
  return (filter && !ids.length) ? [] : load(ids)
}