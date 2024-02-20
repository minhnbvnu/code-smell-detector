async function createAndTransferToAccount({
  connection,
  owner,
  sourcePublicKey,
  destinationPublicKey,
  amount,
  memo,
  mint,
  decimals,
}) {
  const [
    createAccountInstruction,
    newAddress,
  ] = await createAssociatedTokenAccountIx(
    owner.publicKey,
    destinationPublicKey,
    mint,
  );
  let transaction = new Transaction();
  transaction.add(
    assertOwner({
      account: destinationPublicKey,
      owner: SystemProgram.programId,
    }),
  );
  transaction.add(createAccountInstruction);
  const transferBetweenAccountsTxn = createTransferBetweenSplTokenAccountsInstruction(
    {
      ownerPublicKey: owner.publicKey,
      mint,
      decimals,
      sourcePublicKey,
      destinationPublicKey: newAddress,
      amount,
      memo,
    },
  );
  transaction.add(transferBetweenAccountsTxn);
  let signers = [];
  return await signAndSendTransaction(connection, transaction, owner, signers);
}