function deriveImportsEncryptionKey(seed) {
  // SLIP16 derivation path.
  return bip32.fromSeed(Buffer.from(seed, 'hex')).derivePath("m/10016'/0")
    .privateKey;
}