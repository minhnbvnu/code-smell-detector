function d3_behavior_dragUp() {
  if (!d3_behavior_dragTarget) return;
  d3_behavior_dragDispatch("dragend");

  // If the node was moved, prevent the mouseup from propagating.
  // Also prevent the subsequent click from propagating (e.g., for anchors).
  if (d3_behavior_dragMoved) {
    d3_eventCancel();
    d3_behavior_dragMoved = d3.event.target === d3_behavior_dragEventTarget;
  }

  d3_behavior_dragEvent =
  d3_behavior_dragEventTarget =
  d3_behavior_dragTarget =
  d3_behavior_dragArguments =
  d3_behavior_dragOffset =
  d3_behavior_dragOrigin = null;
}