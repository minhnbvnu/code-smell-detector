function setUnlockedMnemonicAndSeed(
  mnemonic,
  seed,
  importsEncryptionKey,
  derivationPath,
) {
  const data = {
    mnemonic,
    seed,
    importsEncryptionKey,
    derivationPath,
  };
  unlockedMnemonicAndSeed = Promise.resolve(data);
  walletSeedChanged.emit('change', data);
}