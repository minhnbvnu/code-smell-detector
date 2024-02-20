function * blocksSaga () {
  // Block Subscriptions
  yield takeLatest(BlocksActions.BLOCKS_LISTENING, callCreateBlockChannel)
  yield takeEvery(BlocksActions.BLOCK_RECEIVED, processBlockHeader)

  // Block Polling
  yield takeLatest(BlocksActions.BLOCKS_POLLING, callCreateBlockPollChannel)
  yield takeEvery(BlocksActions.BLOCK_FOUND, processBlock)
}