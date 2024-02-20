function * drizzleStatusSaga () {
  yield takeLatest(DrizzleActions.DRIZZLE_INITIALIZING, initializeDrizzle)
}