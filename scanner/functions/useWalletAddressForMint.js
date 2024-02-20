function useWalletAddressForMint(mint) {
  const [walletAccounts] = useWalletTokenAccounts();
  return useMemo(
    () =>
      mint
        ? walletAccounts
            ?.find((account) => account.parsed?.mint?.equals(mint))
            ?.publicKey.toBase58()
        : null,
    [walletAccounts, mint],
  );
}