function * createAccountsPollChannel ({ interval, web3 }) {
  return eventChannel(emit => {
    const persistedWeb3 = web3

    const accountsPoller = setInterval(() => {
      emit({ type: AccountsActions.SYNCING_ACCOUNTS, persistedWeb3 })
    }, interval) // options.polls.accounts

    const unsubscribe = () => {
      clearInterval(accountsPoller)
    }

    return unsubscribe
  })
}