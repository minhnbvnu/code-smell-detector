function attachDoc(cm, doc) {
  if (doc.cm) { throw new Error("This document is already in use.") }
  cm.doc = doc;
  doc.cm = cm;
  estimateLineHeights(cm);
  loadMode(cm);
  if (!cm.options.lineWrapping) { findMaxLine(cm); }
  cm.options.mode = doc.modeOption;
  regChange(cm);
}