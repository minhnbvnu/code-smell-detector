function mintTestToken() {
    let mint = new Account();
    updateTokenName(
      mint.publicKey,
      `Test Token ${abbreviateAddress(mint.publicKey)}`,
      `TEST${mint.publicKey.toBase58().slice(0, 2)}`,
    );
    sendTransaction(
      createAndInitializeMint({
        connection: wallet.connection,
        owner: wallet,
        mint,
        amount: 1000,
        decimals: 2,
        initialAccount: new Account(),
      }),
      { onSuccess: () => refreshWalletPublicKeys(wallet) },
    );
  }