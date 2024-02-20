function trashDraggedPiece() {
  removeSquareHighlights();

  // remove the source piece
  var newPosition = deepCopy(CURRENT_POSITION);
  delete newPosition[DRAGGED_PIECE_SOURCE];
  setCurrentPosition(newPosition);

  // redraw the position
  drawPositionInstant();

  // hide the dragged piece
  draggedPieceEl.fadeOut(cfg.trashSpeed);

  // set state
  DRAGGING_A_PIECE = false;
}