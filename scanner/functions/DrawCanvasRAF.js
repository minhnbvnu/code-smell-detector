function DrawCanvasRAF(t) {
  var tc = TagCanvas.tc, i;
  TagCanvas.NextFrame(TagCanvas.interval);
  t = t || TimeNow();
  for(i in tc)
    tc[i].Draw(t);
}