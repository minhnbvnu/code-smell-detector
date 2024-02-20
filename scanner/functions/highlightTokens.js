function highlightTokens(defs, text) {
  let highlighted = "";

  for (const {
    type,
    value
  } of tokenize(text)) {
    const colorize = defs[type];

    if (colorize) {
      highlighted += value.split(NEWLINE).map(str => colorize(str)).join("\n");
    } else {
      highlighted += value;
    }
  }

  return highlighted;
}