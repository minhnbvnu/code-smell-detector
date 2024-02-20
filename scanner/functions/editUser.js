function* editUser ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: api.user,
      data: payload.user
    })
    yield put(userEdited(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}