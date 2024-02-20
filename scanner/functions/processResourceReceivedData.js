function processResourceReceivedData(event, timestamp, profilerData, state) {
  const requestId = event.args.data.requestId;
  const networkMeasure = state.requestIdToNetworkMeasureMap.get(requestId);

  if (networkMeasure != null) {
    if (networkMeasure.firstReceivedDataTimestamp === 0) {
      networkMeasure.firstReceivedDataTimestamp = timestamp;
    }

    networkMeasure.lastReceivedDataTimestamp = timestamp;
    networkMeasure.finishTimestamp = timestamp;
  }
}