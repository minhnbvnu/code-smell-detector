function parseStateUpdates(stateUpdates, timestamp, convertPrimitive) {
  const {STREAM_BLACKLIST} = getXVIZConfig();

  const newStreams = {};
  const primitives = {};
  const variables = {};
  const futures = {};

  for (const stateUpdate of stateUpdates) {
    Object.assign(primitives, stateUpdate.primitives);
    Object.assign(variables, stateUpdate.variables);
    Object.assign(futures, stateUpdate.futures);
  }

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

  Object.keys(futures)
    .filter(streamName => !STREAM_BLACKLIST.has(streamName))
    .forEach(future => {
      newStreams[future] = parseStreamFutures(futures[future], future, timestamp, convertPrimitive);
    });

  return newStreams;
}