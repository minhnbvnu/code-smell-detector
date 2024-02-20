function createBlockChannel ({ drizzle, web3, syncAlways }) {
  return eventChannel(emit => {
    const blockEvents = web3.eth
      .subscribe('newBlockHeaders', (error, result) => {
        if (error) {
          emit({ type: BlocksActions.BLOCKS_FAILED, error })

          console.error('Error in block header subscription:')
          console.error(error)

          emit(END)
        }
      })
      .on('data', blockHeader => {
        emit({ type: BlocksActions.BLOCK_RECEIVED, blockHeader, drizzle, web3, syncAlways })
      })
      .on('error', error => {
        emit({ type: BlocksActions.BLOCKS_FAILED, error })
        emit(END)
      })

    const unsubscribe = () => {
      blockEvents.off()
    }

    return unsubscribe
  })
}