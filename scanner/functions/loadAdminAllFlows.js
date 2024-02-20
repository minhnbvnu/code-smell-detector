function loadAdminAllFlows (resolve) {
  return {
    type: LOAD_ADMIN_ALL_FLOWS,
    payload: {
      resolve
    }
  }
}