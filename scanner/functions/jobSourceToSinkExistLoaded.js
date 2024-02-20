function jobSourceToSinkExistLoaded (result) {
  return {
    type: LOAD_JOB_SOURCETOSINK_EXIST_SUCCESS,
    payload: {
      result
    }
  }
}