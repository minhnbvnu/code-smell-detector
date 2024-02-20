function listenToEmberDebugPort(emberDebugPort) {
    // listen for messages from EmberDebug, and pass them on to the background script
    emberDebugPort.addEventListener('message', function(event) {
      chrome.runtime.sendMessage(event.data);
    });

    // listen for messages from the EmberInspector, and pass them on to EmberDebug
    chrome.runtime.onMessage.addListener(function(message) {
      if (message.from === 'devtools') {
        // forward message to EmberDebug
        emberDebugPort.postMessage(message);
      }
    });

    emberDebugPort.start();
  }