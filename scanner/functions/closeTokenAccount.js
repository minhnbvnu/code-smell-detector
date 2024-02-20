async function closeTokenAccount({
  connection,
  owner,
  sourcePublicKey,
  skipPreflight,
}) {
  let transaction = new Transaction().add(
    closeAccount({
      source: sourcePublicKey,
      destination: owner.publicKey,
      owner: owner.publicKey,
    }),
  );
  let signers = [];
  return await signAndSendTransaction(
    connection,
    transaction,
    owner,
    signers,
    skipPreflight,
  );
}