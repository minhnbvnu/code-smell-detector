function* editroleTypeUserPsw ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: api.changepwd,
      data: payload.pwdValues
    })
    if (result.code !== 200) {
      yield put(roleTypeUserPswErrorEdited(result.msg))
      payload.reject(result.msg)
    } else {
      yield put(roleTypeUserPswEdited(result.msg))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}