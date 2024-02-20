function* getRiderInfosWatcher () {
  yield fork(takeLatest, LOAD_RIDERINFOS, getRiderInfos)
}