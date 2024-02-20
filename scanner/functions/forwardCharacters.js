function forwardCharacters(file, start, chars) {
    var pos = start + chars,
        m;

    if (file.hasAstral) {
      astral.lastIndex = start;

      while ((m = astral.exec(file.text)) && m.index < pos) pos++;
    }

    return pos;
  }