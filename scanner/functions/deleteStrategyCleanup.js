function* deleteStrategyCleanup(accountId) {
  const transactions = yield call(TransactionsStorage.loadFiltered, {
    accounts: [accountId]
  });
  if (transactions.length > 0) {
    yield put(removeAccountStart(transactions.length));

    for (const [index, tx] of transactions.entries()) {
      yield removeTransactionSaga(removeTransaction(tx.id));
      yield put(removeAccountItemProcessed(index));
    }
  }

  yield call(AccountsStorage.remove, accountId);
  yield put(removeAccountSuccess(accountId));
}