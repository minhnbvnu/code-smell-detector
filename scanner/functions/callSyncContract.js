function * callSyncContract (action) {
  // Get contract state from store
  const contract = action.contract
  const contractName = contract.contractName

  const contractsState = yield select(getContractsState)
  var contractFnsState = Object.assign({}, contractsState[contractName])

  // Remove unnecessary keys
  delete contractFnsState.initialized
  delete contractFnsState.synced
  delete contractFnsState.events

  // Iterate over functions and hashes
  for (var fnName in contractFnsState) {
    for (var argsHash in contractFnsState[fnName]) {
      const fnIndex = contractFnsState[fnName][argsHash].fnIndex
      const args = contractFnsState[fnName][argsHash].args

      // Pull args and call fn for each given function
      // keeping for pre-v1.1.5 compatibility with CALL_CONTRACT_FN event.
      yield put({
        type: ContractActions.CALL_CONTRACT_FN,
        contract,
        fnName,
        fnIndex,
        args,
        argsHash,
        sync: true
      })
      yield call(callCallContractFn, {
        contract,
        fnName,
        fnIndex,
        args,
        argsHash
      })
    }
  }

  // When complete, dispatch CONTRACT_SYNCED
  yield put({ type: ContractActions.CONTRACT_SYNCED, contractName })
}