function* editInstance ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: api.instance,
      data: payload.value
    })

    if (result.code && result.code === 400) {
      yield put(instanceEditedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(instanceEdited(result.payload))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}