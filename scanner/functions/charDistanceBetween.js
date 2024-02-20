function charDistanceBetween(file, start, end) {
    var diff = end - start,
        m;

    if (file.hasAstral) {
      astral.lastIndex = start;

      while ((m = astral.exec(file.text)) && m.index < end) diff--;
    }

    return diff;
  }