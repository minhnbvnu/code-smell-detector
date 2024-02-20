function createTransferBetweenSplTokenAccountsInstruction({
  ownerPublicKey,
  mint,
  decimals,
  sourcePublicKey,
  destinationPublicKey,
  amount,
  memo,
}) {
  let transaction = new Transaction().add(
    transferChecked({
      source: sourcePublicKey,
      mint,
      decimals,
      destination: destinationPublicKey,
      owner: ownerPublicKey,
      amount,
    }),
  );
  if (memo) {
    transaction.add(memoInstruction(memo));
  }
  return transaction;
}