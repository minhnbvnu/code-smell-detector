function touchendWindow(e) {
  // do nothing if we are not dragging a piece
  if (DRAGGING_A_PIECE !== true) return;

  // get the location
  var location = isXYOnSquare(e.originalEvent.changedTouches[0].pageX,
    e.originalEvent.changedTouches[0].pageY);

  stopDraggedPiece(location);
}