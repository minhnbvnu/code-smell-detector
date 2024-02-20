function streamConfigJvmLoaded (result) {
  return {
    type: LOAD_STREAM_CONFIG_JVM_SUCCESS,
    payload: {
      result
    }
  }
}