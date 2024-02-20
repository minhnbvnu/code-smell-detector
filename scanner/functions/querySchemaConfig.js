function querySchemaConfig (ids, type, resolve) {
  return {
    type: QUERY_SCHEMA_CONFIG,
    payload: {
      ids,
      type,
      resolve
    }
  }
}