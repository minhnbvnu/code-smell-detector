function projectUdfsLoaded (udfs) {
  return {
    type: LOAD_PROJECT_UDFS_SUCCESS,
    payload: {
      udfs
    }
  }
}