function* removeUserTopic ({payload}) {
  try {
    const result = yield call(request, {
      method: 'delete',
      url: `${api.projectUserList}/${payload.projectId}/streams/${payload.streamId}/topics/userdefined/${payload.topicId}`
    })
    if (result.header.code && result.header.code === 200) {
      yield put(deleteUserTopicLoaded(result.payload))
      payload.resolve(result.payload)
    } else {
      payload.reject(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'removeUserTopic')
  }
}