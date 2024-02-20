function headerLevel(lineNo, line, nextLine) {
    var match = line && line.match(/^#+/);
    if (match && isHeader(lineNo)) return match[0].length;
    match = nextLine && nextLine.match(/^[=\-]+\s*$/);
    if (match && isHeader(lineNo + 1)) return nextLine[0] == "=" ? 1 : 2;
    return maxDepth;
  }