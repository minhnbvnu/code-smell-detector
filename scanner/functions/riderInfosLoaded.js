function riderInfosLoaded (riderInfos) {
  return {
    type: LOAD_RIDERINFOS_SUCCESS,
    payload: {
      riderInfos
    }
  }
}