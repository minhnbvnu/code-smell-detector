function processResourceReceiveResponse(event, timestamp, profilerData, state) {
  const requestId = event.args.data.requestId;
  const networkMeasure = state.requestIdToNetworkMeasureMap.get(requestId);

  if (networkMeasure != null) {
    networkMeasure.receiveResponseTimestamp = timestamp;
  }
}