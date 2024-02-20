function processResourceSendRequest(event, timestamp, profilerData, state) {
  const data = event.args.data;
  const requestId = data.requestId;
  const availableDepths = new Array(state.requestIdToNetworkMeasureMap.size + 1).fill(true);
  state.requestIdToNetworkMeasureMap.forEach(({
    depth
  }) => {
    availableDepths[depth] = false;
  });
  let depth = 0;

  for (let i = 0; i < availableDepths.length; i++) {
    if (availableDepths[i]) {
      depth = i;
      break;
    }
  }

  const networkMeasure = {
    depth,
    finishTimestamp: 0,
    firstReceivedDataTimestamp: 0,
    lastReceivedDataTimestamp: 0,
    requestId,
    requestMethod: data.requestMethod,
    priority: data.priority,
    sendRequestTimestamp: timestamp,
    receiveResponseTimestamp: 0,
    url: data.url
  };
  state.requestIdToNetworkMeasureMap.set(requestId, networkMeasure);
  profilerData.networkMeasures.push(networkMeasure);
  networkMeasure.sendRequestTimestamp = timestamp;
}