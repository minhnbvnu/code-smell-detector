function clearHighlighted(cm) {
    if (cm.state.matchBrackets && cm.state.matchBrackets.currentlyHighlighted) {
      cm.state.matchBrackets.currentlyHighlighted();
      cm.state.matchBrackets.currentlyHighlighted = null;
    }
  }