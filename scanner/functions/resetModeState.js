function resetModeState(cm) {
  cm.doc.iter(function (line) {
    if (line.stateAfter) { line.stateAfter = null; }
    if (line.styles) { line.styles = null; }
  });
  cm.doc.frontier = cm.doc.first;
  startWorker(cm, 100);
  cm.state.modeGen++;
  if (cm.curOp) { regChange(cm); }
}