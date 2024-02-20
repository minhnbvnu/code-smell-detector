function d3_behavior_zoomMousemove() {
  d3_behavior_zoomZooming = null;
  if (d3_behavior_zoomPanning) {
    d3_behavior_zoomMoved = 1;
    d3_behavior_zoomTo(d3_behavior_zoomXyz[2], d3.svg.mouse(d3_behavior_zoomTarget), d3_behavior_zoomPanning);
  }
}