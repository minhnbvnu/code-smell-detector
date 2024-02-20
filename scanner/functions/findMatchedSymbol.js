function findMatchedSymbol(cm, cur, symb) {
    var line = cur.line;
    var symb = symb ? symb : cm.getLine(line)[cur.ch];

    // Are we at the opening or closing char
    var forwards = ['(', '[', '{'].indexOf(symb) != -1;

    var reverseSymb = (function(sym) {
      switch (sym) {
        case '(' : return ')';
        case '[' : return ']';
        case '{' : return '}';
        case ')' : return '(';
        case ']' : return '[';
        case '}' : return '{';
        default : return null;
      }
    })(symb);

    // Couldn't find a matching symbol, abort
    if (reverseSymb == null) return cur;

    // Tracking our imbalance in open/closing symbols. An opening symbol wii be
    // the first thing we pick up if moving forward, this isn't true moving backwards
    var disBal = forwards ? 0 : 1;

    while (true) {
      if (line == cur.line) {
        // First pass, do some special stuff
        var currLine =  forwards ? cm.getLine(line).substr(cur.ch).split('') : cm.getLine(line).substr(0,cur.ch).split('').reverse();
      } else {
        var currLine =  forwards ? cm.getLine(line).split('') : cm.getLine(line).split('').reverse();
      }

      for (var index = 0;  index < currLine.length; index++) {
        if (currLine[index] == symb) disBal++;
        else if (currLine[index] == reverseSymb) disBal--;

        if (disBal == 0) {
          if (forwards && cur.line == line) return {line: line, ch: index + cur.ch};
          else if (forwards) return {line: line, ch: index};
          else return {line: line, ch: currLine.length - index - 1 };
        }
      }

      if (forwards) line++;
      else line--;
    }
  }