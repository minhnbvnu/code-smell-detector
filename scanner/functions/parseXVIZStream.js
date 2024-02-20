function parseXVIZStream(data, convertPrimitive) {
  // data is an array of objects
  // Each object is [{primitives, variables, timestamp},...]
  // Each object represents a timestamp and array of objects

  // V1 has a no-data entry that results in setting all top-level types to an
  // empty array. See the test cases.
  //
  // Usually only one of these fields is valid and thus only one is normally
  // iterated below.
  const {primitives, ui_primitives, variables, futures} = data[0];

  // At this point, we either have one or the other.
  // TODO(twojtasz): BUG: there is an assumption that
  // streamNames will be unique.  Need to put in a detection if
  // that is violated.
  if (primitives) {
    const streamName = Object.keys(primitives)[0];
    return data.map(datum =>
      parseStreamPrimitive(
        datum.primitives[streamName],
        streamName,
        datum.timestamp,
        convertPrimitive
      )
    );
  } else if (variables) {
    const streamName = Object.keys(variables)[0];
    return data.map(datum =>
      parseStreamVariable(datum.variables[streamName], streamName, datum.timestamp)
    );
  } else if (futures) {
    const streamName = Object.keys(futures)[0];
    return data.map(datum =>
      parseStreamFutures(datum.futures[streamName], streamName, datum.timestamp, convertPrimitive)
    );
  } else if (ui_primitives) {
    const streamName = Object.keys(ui_primitives)[0];
    return data.map(datum =>
      parseStreamUIPrimitives(datum.ui_primitives[streamName], streamName, datum.timestamp)
    );
  }

  return {};
}