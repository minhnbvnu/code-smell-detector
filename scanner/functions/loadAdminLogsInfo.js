function loadAdminLogsInfo (projectId, streamId, resolve) {
  return {
    type: LOAD_ADMIN_LOGS_INFO,
    payload: {
      projectId,
      streamId,
      resolve
    }
  }
}