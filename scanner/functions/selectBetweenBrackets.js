function selectBetweenBrackets(cm) {
    var ranges = cm.listSelections(), newRanges = []
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i], pos = range.head, opening = cm.scanForBracket(pos, -1);
      if (!opening) return false;
      for (;;) {
        var closing = cm.scanForBracket(pos, 1);
        if (!closing) return false;
        if (closing.ch == mirror.charAt(mirror.indexOf(opening.ch) + 1)) {
          var startPos = Pos(opening.pos.line, opening.pos.ch + 1);
          if (CodeMirror.cmpPos(startPos, range.from()) == 0 &&
              CodeMirror.cmpPos(closing.pos, range.to()) == 0) {
            opening = cm.scanForBracket(opening.pos, -1);
            if (!opening) return false;
          } else {
            newRanges.push({anchor: startPos, head: closing.pos});
            break;
          }
        }
        pos = Pos(closing.pos.line, closing.pos.ch + 1);
      }
    }
    cm.setSelections(newRanges);
    return true;
  }