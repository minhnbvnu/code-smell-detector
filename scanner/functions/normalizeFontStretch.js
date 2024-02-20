function normalizeFontStretch(stretch) {
  stretch = stretch || "normal";

  return typeof fontStretchLookup[stretch] === "number" ? stretch : "normal";
}