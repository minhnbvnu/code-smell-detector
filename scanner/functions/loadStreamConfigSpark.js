function loadStreamConfigSpark (resolve) {
  return {
    type: LOAD_STREAM_CONFIG_SPARK,
    payload: {
      resolve
    }
  }
}