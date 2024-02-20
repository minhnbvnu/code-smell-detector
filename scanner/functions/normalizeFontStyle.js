function normalizeFontStyle(style) {
  style = style || "normal";

  return fontStyleOrder[style] ? style : "normal";
}