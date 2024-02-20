function getY(pos, top) {
      if (curLine != pos.line) {
        curLine = pos.line
        curLineObj = cm.getLineHandle(pos.line)
        var visual = cm.getLineHandleVisualStart(curLineObj)
        if (visual != curLineObj) {
          curLine = cm.getLineNumber(visual)
          curLineObj = visual
        }
      }
      if ((curLineObj.widgets && curLineObj.widgets.length) ||
          (wrapping && curLineObj.height > singleLineH))
        return cm.charCoords(pos, "local")[top ? "top" : "bottom"];
      var topY = cm.heightAtLine(curLineObj, "local");
      return topY + (top ? 0 : curLineObj.height);
    }