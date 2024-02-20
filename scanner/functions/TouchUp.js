function TouchUp(e) {
  var t = TagCanvas, tg = EventToCanvasId(e);
  if(tg && e.changedTouches && t.tc[tg]) {
    TouchMove(e);
    if(!t.tc[tg].EndDrag()){
      t.tc[tg].Draw();
      t.tc[tg].Clicked(e);
    }
  }
}