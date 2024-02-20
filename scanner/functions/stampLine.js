function stampLine(stamp, line) {
    var len = line ? chalk.stripColor(line).length : 0;
    if (len > maxLineLength) {
      return stamp + line.slice(0, maxLineLength) + newline +
        stampLine(blank, line.slice(maxLineLength));
    }
    return stamp + line + newline;
  }