function* deleteUserAction ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'delete',
      url: `${api.user}/${payload.userId}`
    })
    if (result.code === 412) {
      yield put(userDeletedError(result.msg))
      payload.reject(result.msg)
    } else if (result.code === 200) {
      yield put(userDeleted(payload.userId))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}