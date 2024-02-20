function * callCreateAccountsPollChannel ({ interval, web3 }) {
  const accountsChannel = yield call(createAccountsPollChannel, {
    interval,
    web3
  })

  try {
    while (true) {
      var event = yield take(accountsChannel)

      if (event.type === AccountsActions.SYNCING_ACCOUNTS) {
        yield call(getAccounts, { web3: event.persistedWeb3 })
        yield call(getAccountBalances, { web3: event.persistedWeb3 })
      }

      yield put(event)
    }
  } finally {
    accountsChannel.close()
  }
}