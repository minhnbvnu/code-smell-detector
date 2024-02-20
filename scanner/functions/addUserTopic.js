function* addUserTopic ({payload}) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: `${api.projectUserList}/${payload.projectId}/streams/${payload.streamId}/topics/userdefined`,
      data: payload.topic
    })
    if (result.header.code && result.header.code === 200) {
      yield put(postUserTopicLoaded(result.payload))
      payload.resolve(result.payload)
    } else {
      payload.reject(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'addUserTopic')
  }
}