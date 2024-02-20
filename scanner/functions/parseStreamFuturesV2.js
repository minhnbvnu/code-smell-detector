function parseStreamFuturesV2(objects, streamName, time, convertPrimitive) {
  const futures = [];

  // objects = {
  //   timestamps: [1, 2, 3],
  //   primitives: [
  //    { <type>: [ <objects for ts[1]> ] },
  //    { <type>: [ <objects for ts[2]> ] },
  //    { <type>: [ <objects for ts[3]> ] }
  //   ]
  // }

  const timestamps = objects.timestamps;
  objects.primitives.forEach((future_set, futureIndex) => {
    // Get the underlying primitive array
    const data = getPrimitiveData(future_set);

    const future = data.primitives
      .map(primitive => {
        const normalizedPrimitive = normalizeXVIZPrimitive(
          XVIZPrimitiveSettingsV2,
          primitive,
          futureIndex,
          streamName,
          data.type,
          time,
          convertPrimitive
        );

        normalizedPrimitive.timestamp = timestamps[futureIndex];
        return normalizedPrimitive;
      })
      .filter(Boolean);

    futures.push(future);
  });

  return {
    time,
    lookAheads: futures
  };
}