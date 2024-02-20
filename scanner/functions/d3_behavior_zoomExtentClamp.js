function d3_behavior_zoomExtentClamp(x, i, k) {
  var range = d3_behavior_zoomExtent[i],
      r0 = range[0],
      r1 = range[1];
  return arguments.length === 3
      ? Math.max(r1 * (r1 === Infinity ? -Infinity : 1 / k - 1),
        Math.min(r0 === -Infinity ? Infinity : r0, x / k)) * k
      : Math.max(r0, Math.min(r1, x));
}