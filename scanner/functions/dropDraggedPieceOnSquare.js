function dropDraggedPieceOnSquare(square) {
  removeSquareHighlights();

  // update position
  var newPosition = deepCopy(CURRENT_POSITION);
  delete newPosition[DRAGGED_PIECE_SOURCE];
  newPosition[square] = DRAGGED_PIECE;
  setCurrentPosition(newPosition);

  // get target square information
  var targetSquarePosition = $('#' + SQUARE_ELS_IDS[square]).offset();

  // animation complete
  var complete = function() {
    drawPositionInstant();
    draggedPieceEl.css('display', 'none');

    // execute their onSnapEnd function
    if (cfg.hasOwnProperty('onSnapEnd') === true &&
      typeof cfg.onSnapEnd === 'function') {
      cfg.onSnapEnd(DRAGGED_PIECE_SOURCE, square, DRAGGED_PIECE);
    }
  };

  // snap the piece to the target square
  var opts = {
    duration: cfg.snapSpeed,
    complete: complete
  };
  draggedPieceEl.animate(targetSquarePosition, opts);

  // set state
  DRAGGING_A_PIECE = false;
}