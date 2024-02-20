function loadStreamConfigs (type, resolve) {
  return {
    type: LOAD_STREAM_CONFIGS,
    payload: {
      type,
      resolve
    }
  }
}