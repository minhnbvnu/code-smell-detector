function moveSel(cm, dir) {
    var newRanges = [], ranges = cm.listSelections(), primary = 0
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i]
      if (range.head == cm.getCursor()) primary = i
      var pos = range.head.ch || dir > 0 ? {line: range.head.line, ch: range.head.ch + dir} : {line: range.head.line - 1}
      newRanges.push({anchor: pos, head: pos})
    }
    cm.setSelections(newRanges, primary)
  }