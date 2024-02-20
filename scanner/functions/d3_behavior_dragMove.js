function d3_behavior_dragMove() {
  if (!d3_behavior_dragTarget) return;
  var parent = d3_behavior_dragTarget.parentNode;

  // O NOES! The drag element was removed from the DOM.
  if (!parent) return d3_behavior_dragUp();

  d3_behavior_dragDispatch("drag");
  d3_eventCancel();
}