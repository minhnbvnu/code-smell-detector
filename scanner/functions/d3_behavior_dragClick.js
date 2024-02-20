function d3_behavior_dragClick() {
  if (d3_behavior_dragMoved) {
    d3_eventCancel();
    d3_behavior_dragMoved = 0;
  }
}