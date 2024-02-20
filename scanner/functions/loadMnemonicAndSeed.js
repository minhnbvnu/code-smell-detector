async function loadMnemonicAndSeed(password, stayLoggedIn) {
  const {
    encrypted: encodedEncrypted,
    nonce: encodedNonce,
    salt: encodedSalt,
    iterations,
    digest,
  } = JSON.parse(localStorage.getItem('locked'));
  const encrypted = bs58.decode(encodedEncrypted);
  const nonce = bs58.decode(encodedNonce);
  const salt = bs58.decode(encodedSalt);
  const key = await deriveEncryptionKey(password, salt, iterations, digest);
  const plaintext = secretbox.open(encrypted, nonce, key);
  if (!plaintext) {
    throw new Error('Incorrect password');
  }
  const decodedPlaintext = Buffer.from(plaintext).toString();
  const { mnemonic, seed, derivationPath } = JSON.parse(decodedPlaintext);
  if (stayLoggedIn) {
    if (isExtension) {
      chrome.runtime.sendMessage({
        channel: 'sollet_extension_mnemonic_channel',
        method: 'set',
        data: decodedPlaintext,
      });
    } else {
      sessionStorage.setItem('unlocked', decodedPlaintext);
    }
  }
  const importsEncryptionKey = deriveImportsEncryptionKey(seed);
  setUnlockedMnemonicAndSeed(
    mnemonic,
    seed,
    importsEncryptionKey,
    derivationPath,
  );
  return { mnemonic, seed, derivationPath };
}