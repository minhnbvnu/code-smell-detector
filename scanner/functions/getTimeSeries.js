function getTimeSeries({streamsMetadata = {}, streamNames, streams}) {
  const timeSeries = {
    isLoading: true,
    data: {},
    missingStreams: []
  };
  for (const streamName of streamNames) {
    // ui configuration for this stream
    const streamMetadata = (streamsMetadata && streamsMetadata[streamName]) || {};
    const stream = streams[streamName];
    if (stream) {
      getTimeSeriesForStream(streamName, streamMetadata, stream, timeSeries);
    }
  }

  timeSeries.missingStreams = streamNames.filter(
    streamToDisplay => !timeSeries.data[streamToDisplay]
  );

  return timeSeries;
}