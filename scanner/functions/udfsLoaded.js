function udfsLoaded (udfs) {
  return {
    type: LOAD_UDFS_SUCCESS,
    payload: {
      udfs
    }
  }
}