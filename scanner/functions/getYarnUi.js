function* getYarnUi ({payload}) {
  const apiFinal = payload.roleType === 'admin'
  ? `${api.projectAdminStream}`
  : `${api.projectStream}`
  try {
    const result = yield call(request, `${apiFinal}/${payload.projectId}/streams/${payload.streamId}/yarnUi`)
    if (result.header.code === 200) {
      payload.resolve(result.payload)
    } else {
      message.warning(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'getYarnUi')
  }
}