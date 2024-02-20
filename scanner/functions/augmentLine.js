function augmentLine(line) {
  const words = $(line).find("WORD").toArray();
  return {
    ocrElement: line,
    words,
    firstWord: words[0],
    lastWord: words[words.length - 1],
  };
}