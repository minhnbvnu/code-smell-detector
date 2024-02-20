function loadMode(cm) {
  cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
  resetModeState(cm);
}