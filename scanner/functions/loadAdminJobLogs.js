function loadAdminJobLogs (projectId, jobId, resolve) {
  return {
    type: LOAD_ADMIN_JOB_LOGS,
    payload: {
      projectId,
      jobId,
      resolve
    }
  }
}