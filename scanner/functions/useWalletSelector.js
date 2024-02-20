function useWalletSelector() {
  const {
    accounts,
    derivedAccounts,
    addAccount,
    setWalletSelector,
    setAccountName,
    hardwareWalletAccount,
    setHardwareWalletAccount,
  } = useContext(WalletContext);

  return {
    accounts,
    derivedAccounts,
    setWalletSelector,
    addAccount,
    setAccountName,
    hardwareWalletAccount,
    setHardwareWalletAccount,
  };
}