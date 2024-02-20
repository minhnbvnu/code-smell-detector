function* editLogForm ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.flow}/${payload.flow.id}`,
      data: payload.flow
    })
    yield put(logFormEdited(result))
    payload.resolve()
  } catch (err) {
    yield put(logFormEditingError(err))
  }
}