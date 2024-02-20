async function storeMnemonicAndSeed(
  mnemonic,
  seed,
  password,
  derivationPath,
) {
  const plaintext = JSON.stringify({ mnemonic, seed, derivationPath });
  if (password) {
    const salt = randomBytes(16);
    const kdf = 'pbkdf2';
    const iterations = 100000;
    const digest = 'sha256';
    const key = await deriveEncryptionKey(password, salt, iterations, digest);
    const nonce = randomBytes(secretbox.nonceLength);
    const encrypted = secretbox(Buffer.from(plaintext), nonce, key);
    localStorage.setItem(
      'locked',
      JSON.stringify({
        encrypted: bs58.encode(encrypted),
        nonce: bs58.encode(nonce),
        kdf,
        salt: bs58.encode(salt),
        iterations,
        digest,
      }),
    );
    localStorage.removeItem('unlocked');
  } else {
    localStorage.setItem('unlocked', plaintext);
    localStorage.removeItem('locked');
  }
  sessionStorage.removeItem('unlocked');
  if (isExtension) {
    chrome.runtime.sendMessage({
      channel: 'sollet_extension_mnemonic_channel',
      method: 'set',
      data: '',
    });
  }
  const importsEncryptionKey = deriveImportsEncryptionKey(seed);
  setUnlockedMnemonicAndSeed(
    mnemonic,
    seed,
    importsEncryptionKey,
    derivationPath,
  );
}