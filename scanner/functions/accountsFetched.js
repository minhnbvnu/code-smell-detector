function accountsFetched (results) {
  return {
    type: AccountsActions.ACCOUNTS_FETCHED,
    payload: results
  }
}