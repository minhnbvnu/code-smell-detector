function storeDatabaseName(queryable, query) {
  if (queryable[symbols.storeDatabase]) {
    const databaseName = dbutils.extractDatabaseChangeFromUse(query)
    if (databaseName) {
      queryable[symbols.databaseName] = databaseName
    }
  }
}