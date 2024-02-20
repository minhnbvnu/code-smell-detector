function handleMessageFromPage(event) {
  if (event.source === window && event.data && event.data.source === 'react-devtools-bridge') {
    backendInitialized = true;
    port.postMessage(event.data.payload);
  }
}