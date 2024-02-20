function preprocessFlamechart(rawData) {
  let parsedData;

  try {
    parsedData = Object(library["importFromChromeTimeline"])(rawData, 'react-devtools');
  } catch (error) {
    // Assume any Speedscope errors are caused by bad profiles
    const errorToRethrow = new InvalidProfileError(error.message);
    errorToRethrow.stack = error.stack;
    throw errorToRethrow;
  }

  const profile = parsedData.profiles[0]; // TODO: Choose the main CPU thread only

  const speedscopeFlamechart = new library["Flamechart"]({
    // $FlowFixMe[method-unbinding]
    getTotalWeight: profile.getTotalWeight.bind(profile),
    // $FlowFixMe[method-unbinding]
    forEachCall: profile.forEachCall.bind(profile),
    // $FlowFixMe[method-unbinding]
    formatValue: profile.formatValue.bind(profile),
    getColorBucketForFrame: () => 0
  });
  const flamechart = speedscopeFlamechart.getLayers().map(layer => layer.map(({
    start,
    end,
    node: {
      frame: {
        name,
        file,
        line,
        col
      }
    }
  }) => ({
    name,
    timestamp: start / 1000,
    duration: (end - start) / 1000,
    scriptUrl: file,
    locationLine: line,
    locationColumn: col
  })));
  return flamechart;
}