function MouseWheel(e) {
  var t = TagCanvas, tg = EventToCanvasId(e);
  if(tg && t.tc[tg]) {
    e.cancelBubble = true;
    e.returnValue = false;
    e.preventDefault && e.preventDefault();
    t.tc[tg].Wheel((e.wheelDelta || e.detail) > 0);
  }
}