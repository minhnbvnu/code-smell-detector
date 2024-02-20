function forgetWallet() {
  localStorage.clear();
  sessionStorage.removeItem('unlocked');
  if (isExtension) {
    chrome.runtime.sendMessage({
      channel: 'sollet_extension_mnemonic_channel',
      method: 'set',
      data: '',
    });
  }
  unlockedMnemonicAndSeed = {
    mnemonic: null,
    seed: null,
    importsEncryptionKey: null,
  };
  walletSeedChanged.emit('change', unlockedMnemonicAndSeed);
  if (isExtension) {
    // Must use wrapper function for window.location.reload
    chrome.storage.local.clear(() => window.location.reload());
  } else {
    window.location.reload();
  }
}