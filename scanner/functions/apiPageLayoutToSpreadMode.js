function apiPageLayoutToSpreadMode(layout) {
  switch (layout) {
    case "SinglePage":
    case "OneColumn":
      return SpreadMode.NONE;

    case "TwoColumnLeft":
    case "TwoPageLeft":
      return SpreadMode.ODD;

    case "TwoColumnRight":
    case "TwoPageRight":
      return SpreadMode.EVEN;
  }

  return SpreadMode.NONE;
}