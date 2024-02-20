function singleProjectLoaded (result) {
  return {
    type: LOAD_SINGLE_PROJECT_SUCCESS,
    payload: {
      result
    }
  }
}