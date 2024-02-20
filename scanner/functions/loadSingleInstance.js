function loadSingleInstance (instanceId, resolve) {
  return {
    type: LOAD_SINGLE_INSTANCE,
    payload: {
      instanceId,
      resolve
    }
  }
}