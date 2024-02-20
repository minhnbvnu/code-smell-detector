function loadUserUsers (projectId, resolve) {
  return {
    type: LOAD_USER_USERS,
    payload: {
      projectId,
      resolve
    }
  }
}