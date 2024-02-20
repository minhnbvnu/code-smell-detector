function fatCursorMarks(cm) {
      var ranges = cm.listSelections(), result = []
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i]
        if (range.empty()) {
          if (range.anchor.ch < cm.getLine(range.anchor.line).length) {
            result.push(cm.markText(range.anchor, Pos(range.anchor.line, range.anchor.ch + 1),
                                    {className: "cm-fat-cursor-mark"}))
          } else {
            var widget = document.createElement("span")
            widget.textContent = "\u00a0"
            widget.className = "cm-fat-cursor-mark"
            result.push(cm.setBookmark(range.anchor, {widget: widget}))
          }
        }
      }
      return result
    }