function performancesLoaded (performances) {
  return {
    type: LOAD_PERFORMANCES_SUCCESS,
    payload: {
      performances
    }
  }
}