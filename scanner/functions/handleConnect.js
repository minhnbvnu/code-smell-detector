function handleConnect(message, sender, sendResponse) {
  chrome.storage.local.get('connectedWallets', (result) => {
    const connectedWallet = (result.connectedWallets || {})[sender.origin];
    if (!connectedWallet) {
      launchPopup(message, sender, sendResponse);
    } else {
      sendResponse({
        method: 'connected',
        params: {
          publicKey: connectedWallet.publicKey,
          autoApprove: connectedWallet.autoApprove,
        },
        id: message.data.id,
      });
    }
  });
}