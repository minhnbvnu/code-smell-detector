function selectCompanionObject(cm, head, symb, inclusive) {
      var cur = head, start, end;

      var bracketRegexp = ({
        '(': /[()]/, ')': /[()]/,
        '[': /[[\]]/, ']': /[[\]]/,
        '{': /[{}]/, '}': /[{}]/,
        '<': /[<>]/, '>': /[<>]/})[symb];
      var openSym = ({
        '(': '(', ')': '(',
        '[': '[', ']': '[',
        '{': '{', '}': '{',
        '<': '<', '>': '<'})[symb];
      var curChar = cm.getLine(cur.line).charAt(cur.ch);
      // Due to the behavior of scanForBracket, we need to add an offset if the
      // cursor is on a matching open bracket.
      var offset = curChar === openSym ? 1 : 0;

      start = cm.scanForBracket(Pos(cur.line, cur.ch + offset), -1, undefined, {'bracketRegex': bracketRegexp});
      end = cm.scanForBracket(Pos(cur.line, cur.ch + offset), 1, undefined, {'bracketRegex': bracketRegexp});

      if (!start || !end) {
        return { start: cur, end: cur };
      }

      start = start.pos;
      end = end.pos;

      if ((start.line == end.line && start.ch > end.ch)
          || (start.line > end.line)) {
        var tmp = start;
        start = end;
        end = tmp;
      }

      if (inclusive) {
        end.ch += 1;
      } else {
        start.ch += 1;
      }

      return { start: start, end: end };
    }