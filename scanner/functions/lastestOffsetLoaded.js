function lastestOffsetLoaded (result) {
  return {
    type: LOAD_LASTEST_OFFSET_SUCCESS,
    payload: {
      result
    }
  }
}