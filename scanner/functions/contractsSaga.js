function * contractsSaga () {
  yield takeEvery(ContractActions.SEND_CONTRACT_TX, callSendContractTx)
  yield takeEvery(ContractActions.CALL_CONTRACT_FN, callCallContractFn)
  yield takeEvery(ContractActions.CONTRACT_SYNCING, callSyncContract)
  yield takeEvery(ContractActions.LISTEN_FOR_EVENT, callListenForContractEvent)
}