async function getExtensionUnlockedMnemonic() {
  if (!isExtension) {
    return null;
  }

  return new Promise((resolve) => {
    chrome.runtime.sendMessage({
      channel: 'sollet_extension_mnemonic_channel',
      method: 'get',
    }, resolve);
  })
}