function * callListenForContractEvent ({ contract, eventName, eventOptions }) {
  const contractEventChannel = yield call(createContractEventChannel, {
    contract,
    eventName,
    eventOptions
  })

  while (true) {
    var event = yield take(contractEventChannel)
    yield put(event)
  }
}