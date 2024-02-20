function apiPageLayoutToSpreadMode(layout) {
  switch (layout) {
    case "SinglePage":
    case "OneColumn":
      return _ui_utils.SpreadMode.NONE;

    case "TwoColumnLeft":
    case "TwoPageLeft":
      return _ui_utils.SpreadMode.ODD;

    case "TwoColumnRight":
    case "TwoPageRight":
      return _ui_utils.SpreadMode.EVEN;
  }

  return _ui_utils.SpreadMode.NONE;
}