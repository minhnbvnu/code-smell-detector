function updateFatCursorMark(cm) {
      if (!cm.state.fatCursorMarks) return;
      clearFatCursorMark(cm);
      var ranges = cm.listSelections(), result = []
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (range.empty()) {
          var lineLength = cm.getLine(range.anchor.line).length;
          if (range.anchor.ch < lineLength) {
            result.push(cm.markText(range.anchor, Pos(range.anchor.line, range.anchor.ch + 1),
                                    {className: "cm-fat-cursor-mark"}));
          } else {
            result.push(cm.markText(Pos(range.anchor.line, lineLength - 1),
                                    Pos(range.anchor.line, lineLength),
                                    {className: "cm-fat-cursor-mark"}));
          }
        }
      }
      cm.state.fatCursorMarks = result;
    }