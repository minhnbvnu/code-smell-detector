function * processBlockHeader ({ blockHeader, drizzle, web3, syncAlways }) {
  const blockNumber = blockHeader.number

  try {
    const block = yield call(web3.eth.getBlock, blockNumber, true)

    yield call(processBlock, { block, drizzle, web3, syncAlways })
  } catch (error) {
    console.error('Error in block processing:')
    console.error(error)

    yield put({ type: BlocksActions.BLOCK_FAILED, error })
  }
}