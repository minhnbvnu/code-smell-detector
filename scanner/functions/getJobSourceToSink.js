function* getJobSourceToSink ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/jobs?sourceNs=${payload.sourceNs}&sinkNs=${payload.sinkNs}`)
    if (result.code === 200) {
      yield put(jobSourceToSinkExistLoaded(result.msg))
      payload.resolve()
    } else {
      yield put(jobSourceToSinkExistErrorLoaded(result.msg))
      payload.reject()
    }
  } catch (err) {
    notifySagasError(err, 'getJobSourceToSink')
  }
}