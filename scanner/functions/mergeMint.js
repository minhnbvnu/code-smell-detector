async function mergeMint(
  assocTokAddr,
  mintAccountSet,
  mint,
  decimals,
  wallet,
  connection,
  enqueueSnackbar,
) {
  if (mintAccountSet.length === 0) {
    return;
  }
  // Get the associated token account.
  let associatedTokenAccount = await (async () => {
    let assocTok = mintAccountSet
      .map((assocTok) => assocTok.publicKey)
      .filter((tokAddr) => tokAddr.equals(assocTokAddr))
      .pop();

    // Do we already have the token account?
    if (assocTok) {
      return assocTok;
    }

    // Check if the associated token account has been created.
    // This is required due to a sometimes unstable network, where
    // the account is created, but the client doesn't receive a
    // response confirmation.
    const accInfo = await connection.getAccountInfo(assocTokAddr);
    if (accInfo !== null) {
      return assocTokAddr;
    }

    // If it doesn't exist, then make it.
    const [address] = await createAssociatedTokenAccount({
      connection,
      wallet,
      splTokenMintAddress: mintAccountSet[0].account.mint,
    });

    return address;
  })();

  // Send all funds to the associated token account for each account.
  // Once the funds are transferred, close the duplicated account.
  for (let k = 0; k < mintAccountSet.length; k += 1) {
    const tokenAccount = mintAccountSet[k];
    if (tokenAccount.publicKey.equals(associatedTokenAccount) === false) {
      if (tokenAccount.account.amount > 0) {
        await wallet.transferToken(
          tokenAccount.publicKey,
          associatedTokenAccount,
          tokenAccount.account.amount,
          mint,
          decimals,
        );
      }
    }
  }
}