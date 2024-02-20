function getDatabaseNameFromUseQuery(query) {
  return dbutil.extractDatabaseChangeFromUse(query)
}