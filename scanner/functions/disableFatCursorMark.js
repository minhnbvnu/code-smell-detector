function disableFatCursorMark(cm) {
      clearFatCursorMark(cm);
      cm.off("cursorActivity", updateFatCursorMark);
      // explicitly set fatCursorMarks to null because event listener above
      // can be invoke after removing it, if off is called from operation
      cm.state.fatCursorMarks = null;
    }