function sourceLogLoadedDetail (total, sourceLog) {
  return {
    type: LOAD_SOURCELOG_DETAIL_SUCCESS,
    payload: {
      total,
      sourceLog
    }
  }
}