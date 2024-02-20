async function createAssociatedTokenAccount({
  connection,
  wallet,
  splTokenMintAddress,
}) {
  const [ix, address] = await createAssociatedTokenAccountIx(
    wallet.publicKey,
    wallet.publicKey,
    splTokenMintAddress,
  );
  const tx = new Transaction();
  tx.add(ix);
  tx.feePayer = wallet.publicKey;
  const txSig = await signAndSendTransaction(connection, tx, wallet, []);

  return [address, txSig];
}