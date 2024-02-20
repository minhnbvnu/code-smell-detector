function loadSourceInput (flowId, taskType, resolve) {
  return {
    type: LOAD_SOURCEINPUT,
    payload: {
      flowId,
      taskType,
      resolve
    }
  }
}