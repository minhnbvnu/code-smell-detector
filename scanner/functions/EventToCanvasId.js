function EventToCanvasId(e) {
  return e.target && Defined(e.target.id) ? e.target.id :
    e.srcElement.parentNode.id;
}