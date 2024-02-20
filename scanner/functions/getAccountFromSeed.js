function getAccountFromSeed(
  seed,
  walletIndex,
  dPath = undefined,
  accountIndex = 0,
) {
  const derivedSeed = deriveSeed(seed, walletIndex, dPath, accountIndex);
  return new Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);
}