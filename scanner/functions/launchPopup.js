function launchPopup(message, sender, sendResponse) {
  const searchParams = new URLSearchParams();
  searchParams.set('origin', sender.origin);
  searchParams.set('network', message.data.params.network);
  searchParams.set('request', JSON.stringify(message.data));

  // TODO consolidate popup dimensions
  chrome.windows.getLastFocused((focusedWindow) => {
    chrome.windows.create({
      url: 'index.html#' + searchParams.toString(),
      type: 'popup',
      width: 375,
      height: 600,
      top: focusedWindow.top,
      left: focusedWindow.left + (focusedWindow.width - 375),
      setSelfAsOpener: true,
      focused: true,
    });
  });

  responseHandlers.set(message.data.id, sendResponse);
}