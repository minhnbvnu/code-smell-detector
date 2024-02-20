function* getSourceToSink ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/flows?sourceNs=${payload.sourceNs}&sinkNs=${payload.sinkNs}`)
    if (result.code === 200) {
      yield put(sourceToSinkExistLoaded(result.msg))
      payload.resolve()
    } else {
      yield put(sourceToSinkExistErrorLoaded(result.msg))
      payload.reject()
    }
  } catch (err) {
    notifySagasError(err, 'getSourceToSink')
  }
}