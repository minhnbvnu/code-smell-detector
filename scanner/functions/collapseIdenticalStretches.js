function collapseIdenticalStretches(mv, margin) {
    if (typeof margin != "number") margin = 2;
    var clear = [], edit = mv.editor(), off = edit.firstLine();
    for (var l = off, e = edit.lastLine(); l <= e; l++) clear.push(true);
    if (mv.left) unclearNearChunks(mv.left, margin, off, clear);
    if (mv.right) unclearNearChunks(mv.right, margin, off, clear);

    for (var i = 0; i < clear.length; i++) {
      if (clear[i]) {
        var line = i + off;
        for (var size = 1; i < clear.length - 1 && clear[i + 1]; i++, size++) {}
        if (size > margin) {
          var editors = [{line: line, cm: edit}];
          if (mv.left) editors.push({line: getMatchingOrigLine(line, mv.left.chunks), cm: mv.left.orig});
          if (mv.right) editors.push({line: getMatchingOrigLine(line, mv.right.chunks), cm: mv.right.orig});
          var mark = collapseStretch(size, editors);
          if (mv.options.onCollapse) mv.options.onCollapse(mv, line, size, mark);
        }
      }
    }
  }