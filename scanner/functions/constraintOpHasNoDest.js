function constraintOpHasNoDest(op) {
  switch (op) {
    case "align-parent-top":
    case "align-parent-bottom":
    case "align-parent-left":
    case "align-parent-right":
    case "center-horizontal":
    case "center-vertical":
      return true;
    default:
      return false;
  }
}