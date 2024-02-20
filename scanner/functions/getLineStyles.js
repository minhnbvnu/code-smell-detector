function getLineStyles(cm, line, updateFrontier) {
  if (!line.styles || line.styles[0] != cm.state.modeGen) {
    var state = getStateBefore(cm, lineNo(line));
    var result = highlightLine(cm, line, line.text.length > cm.options.maxHighlightLength ? copyState(cm.doc.mode, state) : state);
    line.stateAfter = state;
    line.styles = result.styles;
    if (result.classes) { line.styleClasses = result.classes; }
    else if (line.styleClasses) { line.styleClasses = null; }
    if (updateFrontier === cm.doc.frontier) { cm.doc.frontier++; }
  }
  return line.styles
}