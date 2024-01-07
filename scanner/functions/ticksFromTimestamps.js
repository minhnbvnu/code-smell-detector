function ticksFromTimestamps(scale, values, majorUnit) {
  const ticks = [];
  /** @type {Object<number,object>} */
  const map = {};
  const ilen = values.length;
  let i, value;

  for (i = 0; i < ilen; ++i) {
    value = values[i];
    map[value] = i;

    ticks.push({
      value,
      major: false
    });
  }

  // We set the major ticks separately from the above loop because calling startOf for every tick
  // is expensive when there is a large number of ticks
  return (ilen === 0 || !majorUnit) ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
}