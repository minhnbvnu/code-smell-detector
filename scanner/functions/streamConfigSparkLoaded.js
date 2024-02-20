function streamConfigSparkLoaded (result) {
  return {
    type: LOAD_STREAM_CONFIG_SPARK_SUCCESS,
    payload: {
      result
    }
  }
}