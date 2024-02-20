function TouchDown(e) {
  var t = TagCanvas, tg = EventToCanvasId(e);
  if(tg && e.changedTouches && t.tc[tg]) {
    t.tc[tg].touched = 1;
    t.tc[tg].BeginDrag(e);
  }
}