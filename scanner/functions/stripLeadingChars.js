function stripLeadingChars(lines) {
    for (var head, i = 1; i < lines.length; i++) {
      var line = lines[i], lineHead = line.match(/^[\s\*]*/)[0];
      if (lineHead != line) {
        if (head == null) {
          head = lineHead;
        } else {
          var same = 0;
          while (same < head.length && head.charCodeAt(same) == lineHead.charCodeAt(same)) ++same;
          if (same < head.length) head = head.slice(0, same);
        }
      }
    }
    lines = lines.map(function(line, i) {
      line = line.replace(/\s+$/, "");
      if (i == 0 && head != null) {
        for (var j = 0; j < head.length; j++) {
          var found = line.indexOf(head.slice(j));
          if (found == 0) return line.slice(head.length - j);
        }
      }
      if (head == null || i == 0) return line.replace(/^[\s\*]*/, "");
      if (line.length < head.length) return "";
      return line.slice(head.length);
    });
    while (lines.length && !lines[lines.length - 1]) lines.pop();
    while (lines.length && !lines[0]) lines.shift();
    return lines;
  }