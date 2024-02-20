function unmemoizedGetBatchRange(batchUID, data, minStartTime = 0) {
  const measures = data.batchUIDToMeasuresMap.get(batchUID);

  if (measures == null || measures.length === 0) {
    throw Error(`Could not find measures with batch UID "${batchUID}"`);
  }

  const lastMeasure = measures[measures.length - 1];
  const stopTime = lastMeasure.timestamp + lastMeasure.duration;

  if (stopTime < minStartTime) {
    return [0, 0];
  }

  let startTime = minStartTime;

  for (let index = 0; index < measures.length; index++) {
    const measure = measures[index];

    if (measure.timestamp >= minStartTime) {
      startTime = measure.timestamp;
      break;
    }
  }

  return [startTime, stopTime];
}