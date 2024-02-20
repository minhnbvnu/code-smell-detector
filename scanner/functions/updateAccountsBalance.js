function* updateAccountsBalance(prev, next) {
  for (const mutation of getAccountsMutations(prev, next)) {
    yield call(updateAccountBalanceSaga, mutation);
  }
}