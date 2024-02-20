function wrapQueryable(shim, queryable, isPoolQuery) {
  if (!queryable || !queryable.query || shim.isWrapped(queryable.query)) {
    shim.logger.debug(
      {
        queryable: !!queryable,
        query: !!(queryable && queryable.query),
        isWrapped: !!(queryable && shim.isWrapped(queryable.query))
      },
      'Not wrapping queryable'
    )
    return false
  }

  const proto = Object.getPrototypeOf(queryable)

  let describe
  if (isPoolQuery) {
    describe = describePoolQuery
  } else {
    describe = describeQuery
    proto[symbols.databaseName] = null
  }

  shim.recordQuery(proto, 'query', describe)

  if (queryable.execute) {
    shim.recordQuery(proto, 'execute', describe)
  }

  return true
}