function useHasLockedMnemonicAndSeed() {
  const [unlockedMnemonic, loading] = useUnlockedMnemonicAndSeed();

  return [!unlockedMnemonic.seed && !!localStorage.getItem('locked'), loading];
}