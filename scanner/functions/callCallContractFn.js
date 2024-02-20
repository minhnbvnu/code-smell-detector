function * callCallContractFn ({
  contract,
  fnName,
  fnIndex,
  args,
  argsHash,
  sync = false
}) {
  // keeping for pre-v1.1.5 compatibility with CALL_CONTRACT_FN event.
  if (sync) {
    return
  }

  // Check for type of object and properties indicative of call/send options.
  if (args.length) {
    const finalArg = args.length > 1 ? args[args.length - 1] : args[0]
    var callArgs = {}
    var finalArgTest = false

    if (typeof finalArg === 'object') {
      var finalArgTest = yield call(isSendOrCallOptions, finalArg)
    }

    if (finalArgTest) {
      callArgs = finalArg

      args.length > 1 ? delete args[args.length - 1] : delete args[0]
      args.length = args.length - 1
    }
  }

  // Create the transaction object and execute the call.
  const txObject = yield call(contract.methods[fnName], ...args)

  try {
    const callResult = yield call(txObject.call, callArgs)

    var dispatchArgs = {
      name: contract.contractName,
      variable: contract.abi[fnIndex].name,
      argsHash: argsHash,
      args: args,
      value: callResult,
      fnIndex: fnIndex
    }

    yield put({ type: ContractActions.GOT_CONTRACT_VAR, ...dispatchArgs })
  } catch (error) {
    console.error(error)

    var errorArgs = {
      name: contract.contractName,
      variable: contract.abi[fnIndex].name,
      argsHash: argsHash,
      args: args,
      error: error,
      fnIndex: fnIndex
    }

    yield put({ type: ContractActions.ERROR_CONTRACT_VAR, ...errorArgs })
  }
}