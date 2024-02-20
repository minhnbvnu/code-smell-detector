function * getNetworkId ({ web3 }) {
  try {
    const networkId = yield call(web3.eth.net.getId)

    yield put({ type: Action.NETWORK_ID_FETCHED, networkId })

    return networkId
  } catch (error) {
    yield put({ type: Action.NETWORK_ID_FAILED, error })

    console.error('Error fetching network ID:')
    console.error(error)
  }
}