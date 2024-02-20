function clearSearchHighlight(cm) {
      var state = getSearchState(cm);
      cm.removeOverlay(getSearchState(cm).getOverlay());
      state.setOverlay(null);
      if (state.getScrollbarAnnotate()) {
        state.getScrollbarAnnotate().clear();
        state.setScrollbarAnnotate(null);
      }
    }