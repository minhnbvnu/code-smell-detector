function parseStreamTimeSeriesV2(seriesArray, streamBlackList) {
  if (!Array.isArray(seriesArray)) {
    return {};
  }
  const {DYNAMIC_STREAM_METADATA} = getXVIZConfig();

  const timeSeriesStreams = {};
  const dupTracker = {};

  seriesArray.forEach(timeSeriesEntry => {
    const {timestamp, streams, values, object_id} = timeSeriesEntry;
    const valueData = getVariableData(values);

    if (!valueData || valueData.values.length !== streams.length) {
      return null;
    }

    valueData.values.forEach((variable, entryIndex) => {
      const streamName = streams[entryIndex];

      if (!streamBlackList.has(streamName)) {
        // A stream could have been present in multiple entries at
        // - different timestamps
        // - different object_id
        // - both
        // Validate for duplicate entries
        const trackStream = dupTracker[streamName];
        let dup = false;
        if (trackStream) {
          const trackObject = trackStream[object_id];

          if (trackObject) {
            // verify unique timestamp
            if (trackObject.has(timestamp)) {
              dup = true;
            } else {
              trackObject.add(timestamp);
            }
          } else {
            trackStream[object_id] = new Set([timestamp]);
          }
        } else {
          // Add new stream tracker
          dupTracker[streamName] = {
            [object_id]: new Set([timestamp])
          };
        }

        if (!dup) {
          const entry = {time: timestamp, variable};
          if (object_id) {
            entry.id = object_id;
          }

          const tsStream = timeSeriesStreams[streamName];
          if (!tsStream) {
            timeSeriesStreams[streamName] = [];
          }
          timeSeriesStreams[streamName].push(entry);

          if (DYNAMIC_STREAM_METADATA) {
            if (!timeSeriesStreams.__metadata) {
              timeSeriesStreams.__metadata = {};
            }
            timeSeriesStreams.__metadata[streamName] = {
              category: 'TIME_SERIES',
              scalar_type: valueData.type
            };
          }
        } else {
          // a duplicate entry is seen, leave the first entry.
          log.warn(
            `Unexpected time_series duplicate ignored: ${streamName} ${timestamp} id: ${object_id}`
          )();
        }
      }
    });

    // eslint consistent-return warning
    // This for loop we do not need to return any value
    return timeSeriesStreams;
  });

  return timeSeriesStreams;
}