function sourceSinkDetailLoaded (total, sourceSink) {
  return {
    type: LOAD_SOURCESINK_DETAIL_SUCCESS,
    payload: {
      total,
      sourceSink
    }
  }
}