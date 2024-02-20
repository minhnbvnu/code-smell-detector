function* deleteStrategyMove(accountId, moveTo) {
  const transactions = yield call(TransactionsStorage.loadFiltered, {
    accounts: [accountId]
  });
  if (transactions.length > 0) {
    yield put(removeAccountStart(transactions.length));

    for (const [index, tx] of transactions.entries()) {
      yield saveTransactionSaga(
        saveTransaction({
          ...tx,
          accountId: tx.accountId === accountId ? moveTo : tx.accountId,
          linkedAccountId:
            tx.linkedAccountId === accountId ? moveTo : tx.linkedAccountId
        })
      );
      yield put(removeAccountItemProcessed(index));
    }
  }

  yield call(AccountsStorage.remove, accountId);
  yield put(removeAccountSuccess(accountId));
}