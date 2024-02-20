function findLineStart(file, line) {
    var text = file.text,
        offsets = file.lineOffsets || (file.lineOffsets = [0]);
    var pos = 0,
        curLine = 0;
    var storePos = Math.min(Math.floor(line / offsetSkipLines), offsets.length - 1);
    var pos = offsets[storePos],
        curLine = storePos * offsetSkipLines;

    while (curLine < line) {
      ++curLine;
      pos = text.indexOf("\n", pos) + 1;
      if (pos === 0) return null;
      if (curLine % offsetSkipLines === 0) offsets.push(pos);
    }

    return pos;
  }