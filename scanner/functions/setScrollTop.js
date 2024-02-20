function setScrollTop(cm, val) {
  if (Math.abs(cm.doc.scrollTop - val) < 2) { return }
  cm.doc.scrollTop = val;
  if (!gecko) { updateDisplaySimple(cm, {top: val}); }
  if (cm.display.scroller.scrollTop != val) { cm.display.scroller.scrollTop = val; }
  cm.display.scrollbars.setScrollTop(val);
  if (gecko) { updateDisplaySimple(cm); }
  startWorker(cm, 100);
}