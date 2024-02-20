function sinkWriteRrrorDetailLoaded (total, sinkWriteRrror) {
  return {
    type: LOAD_SINKWRITERROR_DETAIL_SUCCESS,
    payload: {
      total,
      sinkWriteRrror
    }
  }
}