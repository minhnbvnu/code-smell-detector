function* operateUserJobWatcher () {
  yield fork(takeEvery, OPERATE_JOB, operateUserJob)
}