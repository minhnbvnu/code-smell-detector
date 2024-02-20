function handleDisconnect(message, sender, sendResponse) {
  chrome.storage.local.get('connectedWallets', (result) => {
    delete result.connectedWallets[sender.origin];
    chrome.storage.local.set(
      { connectedWallets: result.connectedWallets },
      () => sendResponse({ method: 'disconnected', id: message.data.id }),
    );
  });
}