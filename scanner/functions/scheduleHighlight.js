function scheduleHighlight(cm, state) {
    clearTimeout(state.timeout);
    state.timeout = setTimeout(function() {highlightMatches(cm);}, state.options.delay);
  }