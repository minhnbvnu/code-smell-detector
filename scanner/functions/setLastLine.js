function setLastLine(line) {
    lastLine = line;
    overwrite = ansi.prefix + (~~(lastLine.length / maxLineLength) + 1) +
      ansi.up + ansi.prefix + ansi.clearLine;
  }