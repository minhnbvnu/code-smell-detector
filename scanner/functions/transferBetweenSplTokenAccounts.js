async function transferBetweenSplTokenAccounts({
  connection,
  owner,
  mint,
  decimals,
  sourcePublicKey,
  destinationPublicKey,
  amount,
  memo,
}) {
  const transaction = createTransferBetweenSplTokenAccountsInstruction({
    ownerPublicKey: owner.publicKey,
    mint,
    decimals,
    sourcePublicKey,
    destinationPublicKey,
    amount,
    memo,
  });
  let signers = [];
  return await signAndSendTransaction(connection, transaction, owner, signers);
}