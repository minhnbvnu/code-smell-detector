function loadSelectUsers (projectId, resolve) {
  return {
    type: LOAD_SELECT_USERS,
    payload: {
      projectId,
      resolve
    }
  }
}