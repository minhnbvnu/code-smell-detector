function getTouchInfo(canvas, w, h, e, i) {
  i = i || 0;
  var rect = canvas.getBoundingClientRect();
  var sx = canvas.scrollWidth / w;
  var sy = canvas.scrollHeight / h;
  var touch = e.touches[i] || e.changedTouches[i];
  return {
    x: (touch.clientX - rect.left) / sx,
    y: (touch.clientY - rect.top) / sy,
    winX: touch.clientX,
    winY: touch.clientY,
    id: touch.identifier
  };
}