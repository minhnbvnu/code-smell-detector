function createGetTransaction(entities, fn) {
  return createTransaction({
    fn,
    method: TransactionMethods.transactGet,
    getEntities: () => entities,
  });
}