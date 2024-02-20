function touchstartSparePiece(e) {
  // do nothing if sparePieces is not enabled
  if (cfg.sparePieces !== true) return;

  var piece = $(this).attr('data-piece');

  e = e.originalEvent;
  beginDraggingPiece('spare', piece,
    e.changedTouches[0].pageX, e.changedTouches[0].pageY);
}