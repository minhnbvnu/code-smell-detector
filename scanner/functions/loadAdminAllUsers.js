function loadAdminAllUsers (resolve) {
  return {
    type: LOAD_ADMIN_ALL_USERS,
    payload: {
      resolve
    }
  }
}