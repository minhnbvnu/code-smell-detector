function cursorActivity(cm) {
    var state = cm.state.matchHighlighter;
    if (state.active || cm.hasFocus()) scheduleHighlight(cm, state)
  }