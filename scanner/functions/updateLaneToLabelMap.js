function updateLaneToLabelMap(profilerData, laneLabelTuplesString) {
  // These marks appear multiple times in the data;
  // We only need to extact them once.
  if (profilerData.laneToLabelMap.size === 0) {
    const laneLabelTuples = laneLabelTuplesString.split(',');

    for (let laneIndex = 0; laneIndex < laneLabelTuples.length; laneIndex++) {
      // The numeric lane value (e.g. 64) isn't important.
      // The profiler parses and stores the lane's position within the bitmap,
      // (e.g. lane 1 is index 0, lane 16 is index 4).
      profilerData.laneToLabelMap.set(laneIndex, laneLabelTuples[laneIndex]);
    }
  }
}