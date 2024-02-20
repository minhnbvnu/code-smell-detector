function createWriteTransaction(entities, fn) {
  return createTransaction({
    fn,
    method: TransactionMethods.transactWrite,
    getEntities: () => entities,
  });
}