function buildLineElement(cm, lineView, lineN, dims) {
  var built = getLineContent(cm, lineView);
  lineView.text = lineView.node = built.pre;
  if (built.bgClass) { lineView.bgClass = built.bgClass; }
  if (built.textClass) { lineView.textClass = built.textClass; }

  updateLineClasses(lineView);
  updateLineGutter(cm, lineView, lineN, dims);
  insertLineWidgets(cm, lineView, dims);
  return lineView.node
}