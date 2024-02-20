function handleMessageFromDevtools(message) {
  window.postMessage({
    source: 'react-devtools-content-script',
    payload: message
  }, '*');
}