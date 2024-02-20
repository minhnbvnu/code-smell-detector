function timestampsToDeltas(timestamps, startTime) {
  return timestamps.map((timestamp, index) => {
    const lastTimestamp = index === 0 ? startTime * 1000000 : timestamps[index - 1];
    return timestamp - lastTimestamp;
  });
}