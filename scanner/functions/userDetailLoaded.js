function userDetailLoaded (result) {
  return {
    type: LOAD_USER_DETAIL_SUCCESS,
    payload: {
      result
    }
  }
}