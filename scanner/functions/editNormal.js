function* editNormal ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.userNormal}/${payload.value.id}`,
      data: payload.value
    })
    yield put(normalEdited(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}