function * callCreateBlockPollChannel ({
  drizzle,
  interval,
  web3,
  syncAlways
}) {
  const blockChannel = yield call(createBlockPollChannel, {
    drizzle,
    interval,
    web3,
    syncAlways
  })

  try {
    while (true) {
      var event = yield take(blockChannel)
      yield put(event)
    }
  } finally {
    blockChannel.close()
  }
}