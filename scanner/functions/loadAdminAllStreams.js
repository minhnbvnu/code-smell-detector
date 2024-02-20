function loadAdminAllStreams (resolve) {
  return {
    type: LOAD_ADMIN_ALL_STREAMS,
    payload: {
      resolve
    }
  }
}