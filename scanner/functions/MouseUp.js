function MouseUp(e) {
  var t = TagCanvas, cb = doc.addEventListener ? 0 : 1,
    tg = EventToCanvasId(e), tc;
  if(tg && e.button == cb && t.tc[tg]) {
    tc = t.tc[tg];
    MouseMove(e);
    if(!tc.EndDrag() && !tc.touched)
      tc.Clicked(e);
  }
}