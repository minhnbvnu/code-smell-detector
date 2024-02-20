function fixup_touches(evt) {
  // convert touch events
  var e = evt;
  if (evt.originalEvent) e = evt.originalEvent;
  evt = {
    pageX: evt.pageX,
    pageY: evt.pageY,
    offsetX: evt.offsetX,
    offsetY: evt.offsetY,
    clientX: evt.clientX,
    clientY: evt.clientY,
    layerX: evt.layerX,
    layerY: evt.layerY,
    target: evt.target,
    currentTarget: evt.currentTarget
  };
  
  if (e.changedTouches && e.changedTouches.length) {
    evt.pageX = e.changedTouches[0].pageX;
    evt.pageY = e.changedTouches[0].pageY;
  } else if (e.touches && e.touches.length) {
    evt.pageX = e.touches[0].pageX;
    evt.pageY = e.touches[0].pageY;
  }
  return evt;
}