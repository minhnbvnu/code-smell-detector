function* getRiderInfos () {
  try {
    const riderInfos = yield call(request, `${api.riderInfo}`)
    yield put(riderInfosLoaded(riderInfos.payload))
  } catch (err) {
    notifySagasError(err, 'getRiderInfos')
  }
}