function useUnlockedMnemonicAndSeed() {
  const [currentUnlockedMnemonic, setCurrentUnlockedMnemonic] = useState(null);
  
  useEffect(() => {
    walletSeedChanged.addListener('change', setCurrentUnlockedMnemonic);
    unlockedMnemonicAndSeed.then(setCurrentUnlockedMnemonic);
    return () => {
      walletSeedChanged.removeListener('change', setCurrentUnlockedMnemonic);
    }
  }, []);

  return !currentUnlockedMnemonic
    ? [EMPTY_MNEMONIC, true]
    : [currentUnlockedMnemonic, false];
}