function* getEmailInputValue ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: `${api.user}?email=${payload.value}`,
      data: payload.value
    })
    if (result.code === 409) {
      yield put(emailInputValueErrorLoaded(result.msg))
      payload.reject()
    } else {
      yield put(emailInputValueLoaded(result.msg))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}