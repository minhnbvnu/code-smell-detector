function enableFatCursorMark(cm) {
      cm.state.fatCursorMarks = [];
      updateFatCursorMark(cm)
      cm.on("cursorActivity", updateFatCursorMark)
    }