function projectNsAllLoaded (result) {
  return {
    type: LOAD_PROJECT_NS_ALL_SUCCESS,
    payload: {
      result
    }
  }
}