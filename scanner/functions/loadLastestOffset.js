function loadLastestOffset (projectId, streamId, resolve, type = 'get', topics = []) {
  return {
    type: LOAD_LASTEST_OFFSET,
    payload: {
      projectId,
      streamId,
      type,
      topics,
      resolve
    }
  }
}