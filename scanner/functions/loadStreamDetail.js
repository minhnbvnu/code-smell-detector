function loadStreamDetail (projectId, streamId, roleType, resolve) {
  return {
    type: LOAD_STREAM_DETAIL,
    payload: {
      projectId,
      streamId,
      roleType,
      resolve
    }
  }
}