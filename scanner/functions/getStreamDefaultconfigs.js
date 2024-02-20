function* getStreamDefaultconfigs ({ payload }) {
  try {
    const result = yield call(request, `${api.userStream}/streams/defaultconfigs?streamType=${payload.type}`)
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getStreamDefaultconfigs')
  }
}