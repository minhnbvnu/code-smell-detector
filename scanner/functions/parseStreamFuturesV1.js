function parseStreamFuturesV1(objects, streamName, time, convertPrimitive) {
  const futures = [];
  // objects = array of objects
  // [{timestamp, primitives[]}, ...]

  // Futures are an array of array of primitives and
  // the objectIndex is used to find the timestamp associated
  // with the set of primitives.
  objects.forEach((object, objectIndex) => {
    const {primitives} = object;

    const future = primitives
      .map(primitive =>
        normalizeXVIZPrimitive(
          XVIZPrimitiveSettingsV1,
          primitive,
          objectIndex,
          streamName,
          primitive.type,
          time,
          convertPrimitive
        )
      )
      .filter(Boolean);

    futures.push(future);
  });

  return {
    time,
    lookAheads: futures
  };
}