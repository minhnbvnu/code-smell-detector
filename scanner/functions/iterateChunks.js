function iterateChunks(diff, f) {
    var startEdit = 0, startOrig = 0;
    var edit = Pos(0, 0), orig = Pos(0, 0);
    for (var i = 0; i < diff.length; ++i) {
      var part = diff[i], tp = part[0];
      if (tp == DIFF_EQUAL) {
        var startOff = startOfLineClean(diff, i) ? 0 : 1;
        var cleanFromEdit = edit.line + startOff, cleanFromOrig = orig.line + startOff;
        moveOver(edit, part[1], null, orig);
        var endOff = endOfLineClean(diff, i) ? 1 : 0;
        var cleanToEdit = edit.line + endOff, cleanToOrig = orig.line + endOff;
        if (cleanToEdit > cleanFromEdit) {
          if (i) f(startOrig, cleanFromOrig, startEdit, cleanFromEdit);
          startEdit = cleanToEdit; startOrig = cleanToOrig;
        }
      } else {
        moveOver(tp == DIFF_INSERT ? edit : orig, part[1]);
      }
    }
    if (startEdit <= edit.line || startOrig <= orig.line)
      f(startOrig, orig.line + 1, startEdit, edit.line + 1);
  }