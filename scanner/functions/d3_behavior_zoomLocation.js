function d3_behavior_zoomLocation(point) {
  return [
    point[0] - d3_behavior_zoomXyz[0],
    point[1] - d3_behavior_zoomXyz[1],
    d3_behavior_zoomXyz[2]
  ];
}