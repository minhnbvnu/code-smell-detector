function normalDetailLoaded (users) {
  return {
    type: LOAD_NORMAL_SUCCESS,
    payload: {
      users
    }
  }
}