function mouseenterSquare(e) {
  // do not fire this event if we are dragging a piece
  // NOTE: this should never happen, but it's a safeguard
  if (DRAGGING_A_PIECE !== false) return;

  if (cfg.hasOwnProperty('onMouseoverSquare') !== true ||
    typeof cfg.onMouseoverSquare !== 'function') return;

  // get the square
  var square = $(e.currentTarget).attr('data-square');

  // NOTE: this should never happen; defensive
  if (validSquare(square) !== true) return;

  // get the piece on this square
  var piece = false;
  if (CURRENT_POSITION.hasOwnProperty(square) === true) {
    piece = CURRENT_POSITION[square];
  }

  // execute their function
  cfg.onMouseoverSquare(square, piece, deepCopy(CURRENT_POSITION),
    CURRENT_ORIENTATION);
}