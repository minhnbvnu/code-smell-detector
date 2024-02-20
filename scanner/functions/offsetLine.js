function offsetLine(line, changeStart, sizeChange) {
    if (line <= changeStart) return line;
    return Math.max(changeStart, line + sizeChange);
  }