function getTraceTargetUpdate(coordinate, traceState, map, snapTolerance) {
  const x = coordinate[0];
  const y = coordinate[1];

  let closestTargetDistance = Infinity;

  let newTargetIndex = -1;
  let newEndIndex = NaN;

  for (
    let targetIndex = 0;
    targetIndex < traceState.targets.length;
    ++targetIndex
  ) {
    const target = traceState.targets[targetIndex];
    const coordinates = target.coordinates;

    let minSegmentDistance = Infinity;
    let endIndex;
    for (
      let coordinateIndex = 0;
      coordinateIndex < coordinates.length - 1;
      ++coordinateIndex
    ) {
      const start = coordinates[coordinateIndex];
      const end = coordinates[coordinateIndex + 1];
      const rel = getPointSegmentRelationship(x, y, start, end);
      if (rel.squaredDistance < minSegmentDistance) {
        minSegmentDistance = rel.squaredDistance;
        endIndex = coordinateIndex + rel.along;
      }
    }

    if (minSegmentDistance < closestTargetDistance) {
      closestTargetDistance = minSegmentDistance;
      if (target.ring && traceState.targetIndex === targetIndex) {
        // same target, maintain the same trace direction
        if (target.endIndex > target.startIndex) {
          // forward trace
          if (endIndex < target.startIndex) {
            endIndex += coordinates.length;
          }
        } else if (target.endIndex < target.startIndex) {
          // reverse trace
          if (endIndex > target.startIndex) {
            endIndex -= coordinates.length;
          }
        }
      }
      newEndIndex = endIndex;
      newTargetIndex = targetIndex;
    }
  }

  const newTarget = traceState.targets[newTargetIndex];
  let considerBothDirections = newTarget.ring;
  if (traceState.targetIndex === newTargetIndex && considerBothDirections) {
    // only consider switching trace direction if close to the start
    const newCoordinate = interpolateCoordinate(
      newTarget.coordinates,
      newEndIndex,
    );
    const pixel = map.getPixelFromCoordinate(newCoordinate);
    if (distance(pixel, traceState.startPx) > snapTolerance) {
      considerBothDirections = false;
    }
  }

  if (considerBothDirections) {
    const coordinates = newTarget.coordinates;
    const count = coordinates.length;
    const startIndex = newTarget.startIndex;
    const endIndex = newEndIndex;
    if (startIndex < endIndex) {
      const forwardDistance = getCumulativeSquaredDistance(
        coordinates,
        startIndex,
        endIndex,
      );
      const reverseDistance = getCumulativeSquaredDistance(
        coordinates,
        startIndex,
        endIndex - count,
      );
      if (reverseDistance < forwardDistance) {
        newEndIndex -= count;
      }
    } else {
      const reverseDistance = getCumulativeSquaredDistance(
        coordinates,
        startIndex,
        endIndex,
      );
      const forwardDistance = getCumulativeSquaredDistance(
        coordinates,
        startIndex,
        endIndex + count,
      );
      if (forwardDistance < reverseDistance) {
        newEndIndex += count;
      }
    }
  }

  sharedUpdateInfo.index = newTargetIndex;
  sharedUpdateInfo.endIndex = newEndIndex;
  return sharedUpdateInfo;
}