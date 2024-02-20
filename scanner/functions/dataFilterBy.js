async function dataFilterBy (filter) {
  const _meta = (await metadata()).map(data => ({ data }))
  const _filtered = filter ? _meta.filter(filter) : _meta
  return _filtered.map(({ data }) => data)
}