function sourceToSinkExistLoaded (result) {
  return {
    type: LOAD_SOURCETOSINK_EXIST_SUCCESS,
    payload: {
      result
    }
  }
}