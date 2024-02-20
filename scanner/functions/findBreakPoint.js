function findBreakPoint(text, column, wrapOn, killTrailingSpace, forceBreak) {
    var at = column
    while (at < text.length && text.charAt(at) == " ") at++
    for (; at > 0; --at)
      if (wrapOn.test(text.slice(at - 1, at + 1))) break;

    if (at == 0 && !forceBreak) {
      // didn't find a break point before column, in non-forceBreak mode try to
      // find one after 'column'.
      for (at = column + 1; at < text.length - 1; ++at) {
        if (wrapOn.test(text.slice(at - 1, at + 1))) break;
      }
    }

    for (var first = true;; first = false) {
      var endOfText = at;
      if (killTrailingSpace)
        while (text.charAt(endOfText - 1) == " ") --endOfText;
      if (endOfText == 0 && first) at = column;
      else return {from: endOfText, to: at};
    }
  }