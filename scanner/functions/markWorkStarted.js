function markWorkStarted(type, startTime, lanes, currentProfilerData, state) {
  const {
    batchUID,
    measureStack
  } = state;
  const depth = getDepth(measureStack);
  const measure = {
    type,
    batchUID,
    depth,
    lanes,
    timestamp: startTime,
    duration: 0
  };
  state.measureStack.push({
    depth,
    measure,
    startTime,
    type
  }); // This array is pre-initialized when the batchUID is generated.

  const measures = currentProfilerData.batchUIDToMeasuresMap.get(batchUID);

  if (measures != null) {
    measures.push(measure);
  } else {
    currentProfilerData.batchUIDToMeasuresMap.set(state.batchUID, [measure]);
  } // This array is pre-initialized before processing starts.


  lanes.forEach(lane => {
    currentProfilerData.laneToReactMeasureMap.get(lane).push(measure);
  });
}