function * callCreateBlockChannel ({ drizzle, web3, syncAlways }) {
  const blockChannel = yield call(createBlockChannel, {
    drizzle,
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