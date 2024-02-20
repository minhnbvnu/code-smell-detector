function getPromiseForRequestID(requestID, eventType, bridge, timeoutMessage) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      bridge.removeListener(eventType, onInspectedElement);
      clearTimeout(timeoutID);
    };

    const onInspectedElement = data => {
      if (data.responseID === requestID) {
        cleanup();
        resolve(data);
      }
    };

    const onTimeout = () => {
      cleanup();
      reject(new TimeoutError(timeoutMessage));
    };

    bridge.addListener(eventType, onInspectedElement);
    const timeoutID = setTimeout(onTimeout, TIMEOUT_DELAY);
  });
}