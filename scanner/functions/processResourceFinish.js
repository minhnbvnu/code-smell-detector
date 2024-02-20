function processResourceFinish(event, timestamp, profilerData, state) {
  const requestId = event.args.data.requestId;
  const networkMeasure = state.requestIdToNetworkMeasureMap.get(requestId);

  if (networkMeasure != null) {
    networkMeasure.finishTimestamp = timestamp;

    if (networkMeasure.firstReceivedDataTimestamp === 0) {
      networkMeasure.firstReceivedDataTimestamp = timestamp;
    }

    if (networkMeasure.lastReceivedDataTimestamp === 0) {
      networkMeasure.lastReceivedDataTimestamp = timestamp;
    } // Clean up now that the resource is done.


    state.requestIdToNetworkMeasureMap.delete(event.args.data.requestId);
  }
}