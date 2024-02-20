function projectUserAllLoaded (result) {
  return {
    type: LOAD_PROJECT_USER_ALL_SUCCESS,
    payload: {
      result
    }
  }
}