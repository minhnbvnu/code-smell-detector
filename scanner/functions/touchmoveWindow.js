function touchmoveWindow(e) {
  // do nothing if we are not dragging a piece
  if (DRAGGING_A_PIECE !== true) return;

  // prevent screen from scrolling
  e.preventDefault();

  updateDraggedPiece(e.originalEvent.changedTouches[0].pageX,
    e.originalEvent.changedTouches[0].pageY);
}