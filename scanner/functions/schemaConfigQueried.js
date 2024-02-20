function schemaConfigQueried (result) {
  return {
    type: QUERY_SCHEMA_CONFIG_SUCCESS,
    payload: {
      result
    }
  }
}