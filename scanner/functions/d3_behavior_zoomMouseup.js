function d3_behavior_zoomMouseup() {
  if (d3_behavior_zoomPanning) {
    if (d3_behavior_zoomMoved) {
      d3_eventCancel();
      d3_behavior_zoomMoved = d3_behavior_zoomEventTarget === d3.event.target;
    }

    d3_behavior_zoomXyz =
    d3_behavior_zoomExtent =
    d3_behavior_zoomDispatch =
    d3_behavior_zoomEventTarget =
    d3_behavior_zoomTarget =
    d3_behavior_zoomArguments =
    d3_behavior_zoomPanning = null;
  }
}