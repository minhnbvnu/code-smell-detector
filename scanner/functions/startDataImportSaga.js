function* startDataImportSaga() {
  try {
    const file = yield select(getImportFile);
    const { transactions, accounts, currencies } = yield call(CsvReader, file);

    yield put(importFileReadSuccess(transactions.length - 1));
    yield updateCurrencySettings(currencies);
    const accountIdByName = yield mapAccountsId(accounts);

    for (const [lineNr, transaction] of transactions.entries()) {
      yield saveTransactionSaga(
        saveTransaction(
          formToState({
            ...transaction,
            accountId: accountIdByName.get(transaction.account),
            linkedAccountId: accountIdByName.get(transaction.linkedAccount)
          })
        )
      );
      yield put(importLineProcessed(lineNr));
    }
  } catch (error) {
    yield put(importFailure(error));
  }
}