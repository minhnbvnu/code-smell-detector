function jobSourceToSinkExistErrorLoaded (result) {
  return {
    type: LOAD_JOB_SOURCETOSINK_EXIST_ERROR,
    payload: {
      result
    }
  }
}