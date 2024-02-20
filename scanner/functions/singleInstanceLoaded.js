function singleInstanceLoaded (result) {
  return {
    type: LOAD_SINGLE_INSTANCE_SUCCESS,
    payload: {
      result
    }
  }
}