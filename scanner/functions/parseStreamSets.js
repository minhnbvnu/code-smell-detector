function parseStreamSets(streamSets, timestamp, convertPrimitive) {
  const {STREAM_BLACKLIST} = getXVIZConfig();

  const newStreams = {};
  const newPoses = {};
  const newLinks = {};

  const poses = {};
  const primitives = {};
  const variables = {};
  const timeSeries = [];
  const futures = {};
  const uiPrimitives = {};
  const noDataStreams = [];

  for (const streamSet of streamSets) {
    Object.assign(newLinks, streamSet.links);

    Object.assign(poses, streamSet.poses);
    Object.assign(primitives, streamSet.primitives);
    Object.assign(variables, streamSet.variables);
    Object.assign(futures, streamSet.future_instances);
    Object.assign(uiPrimitives, streamSet.ui_primitives);

    if (streamSet.time_series) {
      if (timeSeries) {
        timeSeries.push(...streamSet.time_series);
      }
    }

    if (streamSet.no_data_streams) {
      noDataStreams.push(...streamSet.no_data_streams);
    }
  }

  Object.keys(newLinks)
    .filter(streamName => !STREAM_BLACKLIST.has(streamName))
    .forEach(streamName => {
      newLinks[streamName] = parseXVIZLink(newLinks[streamName]);
    });

  Object.keys(poses)
    .filter(streamName => !STREAM_BLACKLIST.has(streamName))
    .forEach(streamName => {
      newPoses[streamName] = parseXVIZPose(poses[streamName]);
    });

  Object.keys(primitives)
    .filter(streamName => !STREAM_BLACKLIST.has(streamName))
    .forEach(primitive => {
      newStreams[primitive] = parseStreamPrimitive(
        primitives[primitive],
        primitive,
        timestamp,
        convertPrimitive
      );
    });

  Object.keys(variables)
    .filter(streamName => !STREAM_BLACKLIST.has(streamName))
    .forEach(variable => {
      newStreams[variable] = parseStreamVariable(variables[variable], variable, timestamp);
    });

  if (timeSeries.length) {
    const timeSeriesStreams = parseStreamTimeSeries(timeSeries, STREAM_BLACKLIST);
    Object.assign(newStreams, timeSeriesStreams);
  }

  Object.keys(futures)
    .filter(streamName => !STREAM_BLACKLIST.has(streamName))
    .forEach(future => {
      newStreams[future] = parseStreamFutures(futures[future], future, timestamp, convertPrimitive);
    });

  Object.keys(uiPrimitives)
    .filter(streamName => !STREAM_BLACKLIST.has(streamName))
    .forEach(primitive => {
      newStreams[primitive] = parseStreamUIPrimitives(
        uiPrimitives[primitive],
        primitive,
        timestamp
      );
    });

  if (noDataStreams.length) {
    // Explicitly set to null and the stream buffer will do the right thing
    noDataStreams.forEach(stream => (newStreams[stream] = null));
  }

  return {
    poses: newPoses,
    streams: newStreams,
    links: newLinks
  };
}