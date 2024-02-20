function loadStreamConfigJvm (resolve) {
  return {
    type: LOAD_STREAM_CONFIG_JVM,
    payload: {
      resolve
    }
  }
}