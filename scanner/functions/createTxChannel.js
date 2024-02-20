function createTxChannel ({
  txObject,
  stackId,
  sendArgs = {},
  contractName,
  stackTempKey
}) {
  var persistTxHash

  return eventChannel(emit => {
    const txPromiEvent = txObject
      .send(sendArgs)
      .on('transactionHash', txHash => {
        persistTxHash = txHash

        emit({ type: TransactionsActions.TX_BROADCASTED, txHash, stackId })
        emit({ type: ContractActions.CONTRACT_SYNC_IND, contractName })
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        emit({
          type: TransactionsActions.TX_CONFIRMATION,
          confirmationReceipt: receipt,
          txHash: persistTxHash
        })
      })
      .on('receipt', receipt => {
        emit({ type: TransactionsActions.TX_SUCCESSFUL, receipt: receipt, txHash: persistTxHash })
        emit(END)
      })
      .on('error', (error, receipt) => {
        console.error(error)
        console.error(receipt)

        emit({ type: TransactionsActions.TX_ERROR, error: error, stackTempKey })
        emit(END)
      })

    const unsubscribe = () => {
      txPromiEvent.off()
    }

    return unsubscribe
  })
}