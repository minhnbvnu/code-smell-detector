function transactionFromJSON(transaction) {
  return new Transaction(
    transaction.inputPublicKey,
    transaction.outputPublicKey,
    transaction.amount,
    transaction.fee,
    transaction.signature
  );
}