function accountsFailed (error) {
  return {
    type: AccountsActions.ACCOUNTS_FAILED,
    payload: error
  }
}