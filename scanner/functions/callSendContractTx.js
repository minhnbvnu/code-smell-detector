function * callSendContractTx ({
  contract,
  fnName,
  fnIndex,
  args,
  stackId,
  stackTempKey
}) {
  // Check for type of object and properties indicative of call/send options.
  if (args.length) {
    const finalArg = args.length > 1 ? args[args.length - 1] : args[0]
    var sendArgs = {}
    var finalArgTest = false

    if (typeof finalArg === 'object') {
      var finalArgTest = yield call(isSendOrCallOptions, finalArg)
    }

    if (finalArgTest) {
      sendArgs = finalArg

      args.length > 1 ? delete args[args.length - 1] : delete args[0]
      args.length = args.length - 1
    }
  }

  // Get name to mark as desynchronized on tx creation
  const contractName = contract.contractName

  // Create the transaction object and execute the tx.
  const txObject = yield call(contract.methods[fnName], ...args)
  const txChannel = yield call(createTxChannel, {
    txObject,
    stackId,
    sendArgs,
    contractName,
    stackTempKey
  })

  try {
    while (true) {
      var event = yield take(txChannel)
      yield put(event)
    }
  } finally {
    txChannel.close()
  }
}