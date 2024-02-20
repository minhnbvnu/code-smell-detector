function createBlockPollChannel ({
  drizzle,
  interval,
  web3,
  syncAlways
}) {
  return eventChannel(emit => {
    const blockTracker = new BlockTracker({
      provider: web3.currentProvider,
      pollingInterval: interval
    })

    blockTracker.on('block', block => {
      emit({ type: BlocksActions.BLOCK_FOUND, block, drizzle, web3, syncAlways })
    })

    blockTracker.start().catch(error => {
      emit({ type: BlocksActions.BLOCKS_FAILED, error })
      emit(END)
    })

    const unsubscribe = () => {
      blockTracker.stop().catch(_ => {
        // BlockTracker assumes there is an outstanding event subscription.
        // However for our tests we start and stop a BlockTracker in succession
        // that triggers an error.
      })
    }

    return unsubscribe
  })
}